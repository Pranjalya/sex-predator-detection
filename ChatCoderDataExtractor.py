import xmltodict
import json
import os

chats = []

# Get the list of all the files
for xmlfile in os.listdir('ChatCoder Data'):

    # Skip the Data Description file
    if(xmlfile=='chatlog.dtd'):
        continue

    # For debugging purposes
    print(xmlfile)

    # Parse XML to OrderedDict
    with open('ChatCoder Data/'+xmlfile) as f:
        data_dict = xmltodict.parse(f.read())

    # Convert OrderDict to regular dictionary for easy parsing
    data_dict = dict(data_dict)
    chatlog = dict(data_dict['CHATLOG'])
    
    # The predator may have multiple usernames for a single chatlog
    predator = []
    if(type(chatlog['PREDATOR']['SCREENNAME'])==type([])):
        for scname in chatlog['PREDATOR']['SCREENNAME']:
            predator.append(scname['USERNAME'])
    else:
        # If it has a single username
        predator.append(chatlog['PREDATOR']['SCREENNAME']['USERNAME'])
    
    # Same for victim
    victim = []
    try:
        if(type(chatlog['VICTIM']['SCREENNAME'])==type([])):
            for scname in chatlog['VICTIM']['SCREENNAME']:
                victim.append(scname['USERNAME'])
        else:
            victim.append(chatlog['VICTIM']['SCREENNAME']['USERNAME'])
    except:
        # If there are multiple victims
        if(type(chatlog['VICTIM'])==type([])):
            for scname in chatlog['VICTIM']:
                victim.append(scname['SCREENNAME']['USERNAME'])

    line = 0
    for post in chatlog['POST']:
        try:
            line += 1
            chats.append({
                "@id":predator[0]+'_'+victim[0],
                "@line":line,
                "author":post['USERNAME'],
                "time":post['DATETIME'].strip('(').rstrip(')'),
                "text":post['BODY'],
                "sexual_predator": 1 if post['USERNAME'] in predator else 0,
                "predator_conversation":1
            })
        except:
            line -= 1

# Dump in JSON format
with open('chatcoder.json', 'w') as f: 
    json.dump(chats, f)
