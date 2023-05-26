from MySQLdb.cursors import DictCursor
import mysql.connector
import grpc
import move_pb2
import move_pb2_grpc
from concurrent import futures
from contextlib import closing


to2D = {105:0, 195:1, 285: 2, 375: 3, 465: 4, 555: 5, 645: 6, 735: 7}


class Game:
    def __init__(self, thisPlayersColorIsWhite):
        self.thisPlayersColorIsWhite = thisPlayersColorIsWhite
        self.toCoord = {}
        self.toAlphabet = {}
        self.toAlphabet2 = {}
        # self.toAlphabet = toAlphabet
        if thisPlayersColorIsWhite:
            self.toCoord = {
                0: 8, 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1
            }
        else:
            self.toCoord = {
                0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8
            }

        if thisPlayersColorIsWhite:
            self.toAlphabet = {
            0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"
        }
        else:
            self.toAlphabet = {
            0: "h", 1: "g", 2: "f", 3: "e", 4: "d", 5: "c", 6: "b", 7: "a"
        }
        if thisPlayersColorIsWhite:
            self.toCoord2 = {
            8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7
        }
        else:
            self.toCoord2 = {
            1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7
        }
        if thisPlayersColorIsWhite:
            self.toAlphabet2 = {
            "a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7
        }
        else:
            self.toAlphabet2 = {
            "h": 0, "g": 1, "f": 2, "e": 3, "d": 4, "c": 5, "b": 6, "a": 7
        }

        self.nQueens = 1

    def toChessMove(self, finalPosition):
        move = ""
        if finalPosition[0] > 100:
            move = self.toAlphabet[to2D[finalPosition[0]]] + str(self.toCoord[to2D[finalPosition[1]]])
        else:
            move = self.toAlphabet[finalPosition[0]] + str(self.toCoord[finalPosition[1]])
        # print("proposed move: " + move)
        return move




class send_moveServicer(move_pb2_grpc.send_moveServicer):
    def getMoves(self, request, context):

        with closing(mysql.connector.connect(database='chess', user='root', password='my_password', host='localhost', )) as connection:
            with connection.cursor() as cursor:

                print(
                    # request.WhitePlayerID,
                    # request.BlackPlayerID,
                    request.GameID,
                    request.FigureKEY,
                    request.Cur_pos)

                game = Game(request.FigureKEY[0] == 'w')

                pos = game.toChessMove(request.Cur_pos)

                dict=[]
                dict.append(request.GameID)
                dict.append(request.FigureKEY)
                dict.append(pos)
                dict.append(request.PlayerID)
                # dict['GameID'] = request.GameID
                # dict['FigureKEY'] = request.FigureKEY
                # dict['Cur_pos'] = request.Cur_pos
                insert_request = 'insert into Moves (GameID, FigureKEY, Cur_pos, PlayerID) values(%s, %s, %s, %s)'
                print(dict)
                cursor.execute(insert_request, dict)
                connection.commit()

                return move_pb2.response(response ='ok')
    

def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=5))
    move_pb2_grpc.add_send_moveServicer_to_server(send_moveServicer(), server=server)
    print('server started')
    server.add_insecure_port('[::]:7000')
    server.start()
    server.wait_for_termination()

main()
