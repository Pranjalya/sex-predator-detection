Main Google Drive directory related to project : https://drive.google.com/folderview?id=1tkBh1Swyv2Q99nd4TTb6XfTVs6qZlzgr

## Sexual Predator Detection and Online Grooming Detection

- Extraction of files include modules to convert the XML dataset into JSON and CSV format.

- EDA includes cleaning of data and performing some basic explorations.

## Available Data

All Data is available with information and in XML format here :- 

https://drive.google.com/drive/folders/1-wJc26sJqlqqhzJnM26e7oVN300ZNYWB?usp=sharing

It includes : 
- PAN 2012 Dataset (Already extracted in CSV and JSON formats by me)
  - Labelled chat logs from questionable sites like Omegle
  
- ChatCoder Data
  - As individual XML files for each conversation.
  - Each conversation is predatory in nature

- Formspring Data
  - Single XML file containing all the converstations
  - Labelled with severity of Cyber Bullying

##### Current Dataset format

|   Field                     |       Description       
|:---------------------------:|:---------------------------------------------:
|  __@id__                    | Unique id for a conversation 
|  __@line__                  | Line number in a conversation
|  __author__                 | Author of a message
|  __time__                   | Timestamp of a message
|  __text__                   | Conent of a message
|  __sequence__               | Ratio of line number to length of conversation
|  __sexual_predator__        | Whether author is sexual predator or not
|  __predator_conversation__  | Whether conversation is predatory or not
