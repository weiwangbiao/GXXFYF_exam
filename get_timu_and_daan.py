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
                f.write(str(r))
                # json.dump(r, f)
