import requests
import pymongo


myclient = pymongo.MongoClient(
    "mongodb://user:shasiXiaoriben!@158.101.93.192:27017/")
db = myclient.gxpf
collection = db.tiku

# search from id 10000 to id 20000
for subjectId in range(1, 999999):
    try:
        # question_type:1 single, 2 multis, 3 bools
        for question_type in range(1, 4):
            # url='https://exam.gxpf.cn/cdndata/question_bank/question_type_1/14978.json'
            # response:{"question":{"itemIds":["53522","53523"],"description":"","itemNums":2,"items":["正确","错误"],"subjectType":3,"subjectId":13654,"subjectName":"任何单位、个人不得违反国家有关规定使用无线电台识别码，影响海上搜救的身份识别。"},"message":"操作成功","status":200}
            r = requests.get('https://exam.gxpf.cn/cdndata/question_bank/question_type_' + str(question_type) + '/' + str(subjectId) + '.json')
            if r.status_code == 200:
                question = r.json().get('question')
                # if question, find answer by http://examapi.gxpf.cn/cdndata/question_bank/options/13654.json
                # response: {"id":"53522"}
                answer = requests.get('https://exam.gxpf.cn/cdndata/question_bank/options/' + str(subjectId) + '.json').json()
                question.update(answer)
                id = question.get('id').split('_')
                idNames = []
                for i in range(0, len(id)):
                    idNames.append(question.get('items')[question.get('itemIds').index(id[i])])
                idNames = {'idNames': idNames}
                question.update(idNames)
                query = {'subjectId':subjectId, 'subjectType':question_type}
                update = {"$set": question}
                result = collection.find_one_and_update(query, update, upsert=True, return_document=pymongo.ReturnDocument.AFTER)
                print(subjectId, result)
    except:
        print('error',subjectId,question_type)
        continue
