import os
from flask import Flask, render_template
from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client.tweet_data

app = Flask(__name__)

@app.route('/')
def hello():
     return render_template('index.html')

@app.route('/posneg')
def numbers():
    clint_pos = count_tweets(True, 'clinton')
    clint_neg = count_tweets(False, 'clinton')
    trump_pos = count_tweets(True, 'trump')
    trump_neg = count_tweets(False, 'trump')
    data = {
        'clinton': {
            'pos': clint_pos,
            'neg': clint_neg
        },
        'trump': {
            'pos': trump_pos,
            'neg': trump_neg
        },
        'total': clint_pos + clint_neg + trump_pos + trump_neg
    }
    parse = json.dumps(data)
    return app.response_class(parse, content_type='application/json')
    
@app.route('/percents')
def percents():
    data = get_percents()
    parse = json.dumps(data)
    return app.response_class(parse, content_type='application/json')
    
def count_tweets(pos, person):
    posts = db.tweets
    found = posts.find({"$and": [{'positive' : pos}, {person : True}]})
    return found.count()
    
def get_percents():
    clint_pos = count_tweets(True, 'clinton')
    clint_neg = count_tweets(False, 'clinton')
    trump_pos = count_tweets(True, 'trump')
    trump_neg = count_tweets(False, 'trump')
    clinton = float(clint_pos)/(clint_pos + clint_neg) * 100
    trump = float(trump_pos)/(trump_pos + trump_neg) * 100
    data = {
        'clinton': round(clinton, 2),
        'trump': round(trump, 2)
    }
    return data
    
app.run()
