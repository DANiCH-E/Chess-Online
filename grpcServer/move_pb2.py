# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: move.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\nmove.proto\"L\n\x04move\x12\x10\n\x08PlayerID\x18\x02 \x01(\x03\x12\x0e\n\x06GameID\x18\x03 \x01(\x03\x12\x11\n\tFigureKEY\x18\x04 \x01(\t\x12\x0f\n\x07\x43ur_pos\x18\x05 \x03(\x05\"\x1c\n\x08response\x12\x10\n\x08response\x18\x01 \x01(\t2)\n\tsend_move\x12\x1c\n\x08getMoves\x12\x05.move\x1a\t.responseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'move_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _globals['_MOVE']._serialized_start=14
  _globals['_MOVE']._serialized_end=90
  _globals['_RESPONSE']._serialized_start=92
  _globals['_RESPONSE']._serialized_end=120
  _globals['_SEND_MOVE']._serialized_start=122
  _globals['_SEND_MOVE']._serialized_end=163
# @@protoc_insertion_point(module_scope)