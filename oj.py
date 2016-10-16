from scrapy import Selector
import requests
import re
def hdu(name):
    r = Selector(text=requests.get('http://acm.hdu.edu.cn/userstatus.php?user='+name,timeout=6).text)
    ac = r.xpath('/html/body/table/tr[4]/td/table/tr/td/table[1]/tr[4]/td[2]/text()').extract()[0]
    return ac


def hn(name):
    r = Selector(text=requests.get('http://125.221.232.253/JudgeOnline/userinfo.php?user='+name,timeout=6).text)
    ac = r.xpath('//*[@id="statics"]/tr[2]/td[2]/a/text()').extract()[0]
    return ac

def bnu(name):
    name = name.replace('_','')
    r = Selector(text=requests.get('http://www.bnuoj.com/v3/userinfo.php?name='+name,timeout=6).text)
    ac = r.xpath('//*[@id="userinfo"]/table/tr[9]/td/div[1]/text()').extract()[0]
    return re.search('\d+',ac).group()


def poj(name):
    r = Selector(text=requests.get('http://poj.org/userstatus?user_id='+name,timeout=6).text)
    ac = r.xpath('/html/body/center/table/tr[3]/td[2]/a/text()').extract()[0]
    return ac


def acdream(name):
    r = Selector(text=requests.get('http://acdream.info/user/'+name,timeout=6).text)
    ac = r.xpath('//*[@class="user-info"]/li[4]/a/text()').extract()[0].strip()
    return ac

def cf(name):
    r = Selector(text=requests.get('http://codeforces.com/profile/'+name,timeout=10).text)
    ac = r.xpath('//*[@id="pageContent"]/div[2]/div[5]/div[2]/ul/li[1]/span[1]/text()').extract()[0]
    return ac


def bestcoder(name):
    r = Selector(text=requests.get('http://bestcoder.hdu.edu.cn/rating.php?user='+name,timeout=6).text)
    ac = r.xpath('//*[@id="profile-heading"]/div/div[3]/span[2]/text()').extract()[0]
    return re.search('\d+',ac).group()


def codechef(name):
    r = Selector(text=requests.get('http://www.codechef.com/users/'+name,timeout=10).text)
    r = r.xpath('//*[@id="hp-sidebar-blurbRating"]/div/table/tr[2]/td[2]//*/text()').extract()
    r = r[0]
    try:
        r = str(int(r))
    except:
        return -1
    return r

oj={'hdu':hdu,'hn':hn,'bnu':bnu,'poj':poj,'acdream':acdream,'cf':cf,'bestcoder':bestcoder,'codechef':codechef}

