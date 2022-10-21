import requests
import json
import time

# search from id 10000 to id 20000
for subjectId in range(10830, 17002):
    # question_type:1 single, 2 multis, 3 bools
    for question_type in range(1, 4):
        # url = http://examapi.gxpf.cn/cdndata/question_bank/question_type_1/13654.json
        # response:{"question":{"itemIds":["53522","53523"],"description":"","itemNums":2,"items":["正确","错误"],"subjectType":3,"subjectId":13654,"subjectName":"任何单位、个人不得违反国家有关规定使用无线电台识别码，影响海上搜救的身份识别。"},"message":"操作成功","status":200}
        r = requests.get('http://examapi.gxpf.cn/cdndata/question_bank/question_type_' + str(question_type) + '/' + str(subjectId) + '.json')
        if r.status_code == 200:
            r = r.json().get('question')
            # if question, find answer by http://examapi.gxpf.cn/cdndata/question_bank/options/13654.json
            # response: {"id":"53522"}
            answer_r = requests.get('http://examapi.gxpf.cn/cdndata/question_bank/options/' + str(subjectId) + '.json').json()
            r.update(answer_r)
            print(r)
            with open(str(subjectId) + '.json', 'w+') as f:
                f.write(str(r)) # if eroor：UnicodeEncodeError: 'gbk' codec can't encode character '\xab' in position 198: illegal multibyte sequence，cmd type “set PYTHONUTF8=1”
                # json.dump(r, f) # write in Unicode，like：{"itemIds": ["63117", "63118"], "description": "", "itemNums": 2, "items": ["\u6b63\u786e", "\u9519\u8bef"], "subjectType": 3, "subjectId": 16213, "subjectName": "\u56e0\u653f\u5e9c\u4f9d\u6cd5\u7edf\u4e00\u5f81\u6536\u519c\u6751\u96c6\u4f53\u571f\u5730\u800c\u5931\u5730\uff0c\u88ab\u5f81\u5730\u519c\u6c11\u4e0d\u4eab\u53d7\u517b\u8001\u4fdd\u9669\u8865\u8d34\u3002(  )", "id": "63118"}
