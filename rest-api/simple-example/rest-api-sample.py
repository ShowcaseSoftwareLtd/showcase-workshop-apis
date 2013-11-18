#!/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib2
import urllib
from StringIO import StringIO
import json
import datetime
from optparse import OptionParser


######
#
#
#####


### CONFIGURE HERE
DEV_KEY = 'abcd1234'
access_token_part = '?access_token='+DEV_KEY


### END CONFIGURATION

dst_url = 'https://app.showcaseworkshop.com/main/api/v1/data'

# Starting life cycle - Creating object
data = {
    "data_name":"Form1",
    "data_type": "form",
    "showcase_id":"3",
    "user_email":"bob@example.com",
    "content":"{\"a\":\"JSON content\"}",
    "date_entered":"2013-01-28T13:01:01Z"
}
encoded_data = urllib.urlencode(data)
req = urllib2.Request(dst_url+access_token_part, encoded_data)
response = urllib2.urlopen(req)
result = response.read()
if response.getcode()==200:
    #SUCCESS
    obj_return = json.loads(result)
else:
    #ERROR
    raise Exception('Error while inserting data')

#Listing all data
req = urllib2.Request(dst_url+access_token_part)
response = urllib2.urlopen(req)
result = response.read()

guid = ''
if response.getcode()==200:
    #SUCCESS
    obj_results = json.loads(result)
    for obj in obj_results:
        guid = obj['guid']
else:
    #ERROR
    raise Exception('Error while listing data')

#Getting info of one data
req = urllib2.Request(dst_url+'/'+guid+access_token_part)
response = urllib2.urlopen(req)
result = response.read()

guid = ''
if response.getcode()==200:
    #SUCCESS
    obj_result = json.loads(result)
    guid = obj['guid']
else:
    #ERROR
    raise Exception('Error while getting data')

#Deleting one data
opener = urllib2.build_opener(urllib2.HTTPHandler)
request = urllib2.Request(dst_url+'/'+guid+access_token_part)
request.get_method = lambda: 'DELETE'
url = opener.open(request)



