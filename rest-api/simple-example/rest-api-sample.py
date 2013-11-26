#!/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib2
import urllib
import json


######
#
# cd ~/sc/data-api/rest-api/simple-example/
# ./rest-api-sample.py
#
#####


### CONFIGURE HERE
DEV_KEY = 'XXX'


### END CONFIGURATION

dst_url = 'https://app.showcaseworkshop.com/main/api/v1/data'
access_token_part = '?access_token=' + DEV_KEY

#
# Add some data
#
if 1 == 1:  # change to 1 == 2 to disable
    data = {
        "data_name": "Form1",
        "data_type": "form",
        "showcase_id": "22",
        "user_email": "paul+1@showcaseworkshop.com",
        "content": "{\"a\":\"JSON content\"}",
        "date_entered": "2013-01-28T13:01:01Z"
    }
    encoded_data = urllib.urlencode(data)
    req = urllib2.Request(dst_url + access_token_part, encoded_data)
    response = urllib2.urlopen(req)
    result = response.read()
    if response.getcode() == 200:
        #SUCCESS
        obj_return = json.loads(result)
    else:
        #ERROR
        raise Exception('Error while inserting data')


guid = ''

#
# List data
#
if 1 == 1:  # change to 1 == 2 to disable
    req = urllib2.Request(dst_url + access_token_part)
    response = urllib2.urlopen(req)
    result = response.read()

    if response.getcode() == 200:
        #SUCCESS
        obj_results = json.loads(result)
        print obj_results
        for obj in obj_results:
            guid = obj['guid']
    else:
        #ERROR
        raise Exception('Error while listing data')


#
# Get one item of data
#
if 1 == 1:  # change to 1 == 2 to disable
    req = urllib2.Request(dst_url + '/' + guid + access_token_part)
    response = urllib2.urlopen(req)
    result = response.read()

    guid = ''
    if response.getcode() == 200:
        #SUCCESS
        obj_result = json.loads(result)
        print obj_result
        guid = obj_result['guid']
    else:
        #ERROR
        raise Exception('Error while getting data')

#
# Deleting one item of data
#
if 1 == 1:  # change to 1 == 2 to disable
    opener = urllib2.build_opener(urllib2.HTTPHandler)
    request = urllib2.Request(dst_url+'/'+guid+access_token_part)
    request.get_method = lambda: 'DELETE'
    url = opener.open(request)
