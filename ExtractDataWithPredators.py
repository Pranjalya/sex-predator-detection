import os
os.system('pip install xmltodict')
import xmltodict
import json
import pandas as pd
from tqdm import tqdm

class ExtractText():
    def __init__(self, filename, predators, out_folder='./'):
        '''
        Extract details from XML files
        Args : filename -> Path to the XML file
               predators -> List of predators
               out_folder -> Path to output folder
        '''
        self.filename = filename
        self.predators = predators
        if (out_folder[-1]=='/'):
            self.out_folder = out_folder
        else:
            self.out_folder = out_folder + '/'
        
        try:
            os.mkdir(self.out_folder)
        except:
            pass

        print("Parsing XML to Dictionary...")
        dictionary = self.xml_to_dictionary()

        # Converting chat message with single chat to list format
        for i in dictionary['conversations']['conversation']:
            if (str(type(i['message'])) != "<class 'list'>"):
                i['message'] = [i['message']]

        print('Converting XML to JSON format...')
        self.xml_to_json(dictionary)

        print('Converting XML to CSV format...')
        self.xml_to_csv(dictionary)
        print("Files created in {} directory".format(self.out_folder))

    def xml_to_dictionary(self):
        '''
        Converts XML file to data dictionary
        '''
        with open(self.filename) as xml_file:
            data_dict = xmltodict.parse(xml_file.read())
        return data_dict

    def xml_to_json(self, dictionary):
        '''
        Converts parsed dictionary to json and saves
        '''
        data = json.dumps(dictionary)
        with open(self.out_folder + self.filename.split('/')[-1].rstrip('xml') + 'json', 'w') as f:
            f.write(data)

    def xml_to_csv(self, dictionary):
        '''
        Converts parsed dictionary to dataframe and saves in CSV format
        '''
        data = []
        for conv in tqdm(dictionary['conversations']['conversation']):
            id = conv['@id']
            len_conv = len(conv['message'])
            authors = set()
            for message in conv['message']:
                d = dict()
                d = {key: message[key] for key in message.keys()}
                d['@id'] = id
                d['sequence'] = round(int(d['@line'])/len_conv, 3)
                d['sexual_predator'] = 1 if d['author'] in self.predators else 0
                authors.add(d['author'])
                data.append(d)
            for d in data[-1*len_conv:]:
                d['predator_conversation'] = 1 if any((True for x in self.predators if x in authors)) else 0
        df = pd.DataFrame(data)
        df = df [['@id', '@line', 'author', 'time', 'text', 'sequence', 'sexual_predator', 'predator_conversation']]
        df.to_csv(self.out_folder + self.filename.split('/')[-1].rstrip('xml') + 'csv', index=False)
