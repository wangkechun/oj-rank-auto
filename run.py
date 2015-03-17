import json
import oj
import types

acmer = json.load(open('acm.json'))

def getuser(user):
    name = user['name']
    pid = user['id']
    score = {}
    for i in oj.oj:
        if i in user:
            score[i] ={'name':user[i]}
        else:
            score[i] ={'name':user['other']}
        if type(score[i]['name'])!=types.ListType:
            score[i]['name'] = [ score[i]['name'] ]
    print score
    for k,v in score.items():
        func = oj.oj[k]
        def clu(name):
            print name
            try:
                return int(float(func(name)))
            except Exception as e:
                print(user['name'],e)
                return -1
        s = [clu(name) for name in v['name'] ]
        
        score[k]= [{'name':i[0],'score':i[1]} for i in zip(v['name'],s) if i[1]>0 ]
    
    user['score'] = score
    return user

if __name__ == '__main__':
    from multiprocessing.dummy import Pool
    pool = Pool(5)
    result = pool.map(getuser,acmer)

    import codecs
    json.dump(result,codecs.open('out.json','w','utf8'),ensure_ascii=False,encoding='utf8',indent=2)

