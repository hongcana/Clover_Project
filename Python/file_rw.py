import numpy as np
import json
import pandas as pd

#numpy encoder
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.int64):
            return int(obj)
        else:
            return str(obj)

# Save as json
# json.dump(딕셔너리, 파일 객체)
def JsonWrite(filename, data):
    with open(filename, 'w', encoding='UTF-8-sig') as make_file:
        json.dump(data, make_file, indent="\t", cls=NpEncoder,\
            ensure_ascii=False)

# Read json
# json.load(파일 객체)
def JsonRead(filename):
    with open(filename, 'r', encoding='UTF-8-sig') as json_file:
        data = json.load(json_file)
    return data

# Excel (or CSV) read