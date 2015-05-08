import json
import oj
import types

acmer = json.load(open('acm.json'))


from redis import Redis
rds = Redis()

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
    # print score
    for k,v in score.items():
        def clu(oj,name):
            func = oj.oj[k]
            key =  k+"#"+name
            r = rds.get(key)
            if r:
                return r
            print key
            try:
                r = int(float(func(name)))
                rds.set(key,r,60*30)
                return r
            except Exception as e:
                if isinstance(e,IndexError):
                    rds.set(key,r,60*30)
                print(key,e)
                return -1
        s = [clu(oj,name) for name in v['name'] ]
        score[k]= [{'name':i[0],'score':i[1]} for i in zip(v['name'],s) if i[1]>0 ]
    
    user['score'] = score
    return user

if __name__ == '__main__':
    from multiprocessing.dummy import Pool
    pool = Pool(5)
    result = pool.map(getuser,acmer)

    import codecs
    json.dump(result,codecs.open('out.json','w','utf8'),ensure_ascii=False,encoding='utf8',indent=2)

