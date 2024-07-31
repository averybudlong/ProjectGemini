import pandas as pd
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

cred = credentials.Certificate("/home/avery/firebase/commoncollegedata-firebase-adminsdk-wcdch-9fadc5b4a2.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

collegeData = pd.read_csv('hd2022.csv', encoding_errors='replace')
cdsData = pd.read_csv('adm2022.csv')

'''
interface College {
  UID: number;
  name: string;
  alias: string;
  city: string;
  state: string;
  website: string;
  appWebsite: string;
  longitude: number;
  latitude: number;
  standardizedTest: number;
  applicants: number;
  applicantsM: number;
  applicantsW: number;
  admitted: number;
  admittedM: number;
  admittedW: number;
  enrolled: number;
  enrolledM: number;
  enrolledW: number;
  SATPct: number;
  ACTPct: number;
  SATRW25: number;
  SATRW50: number;
  SATRW75: number;
  SATM25: number;
  SATM50: number;
  SATM75: number;
  ACT25: number;
  ACT50: number;
  ACT75: number;
  ACTE25: number;
  ACTE50: number;
  ACTE75: number;
  ACTM25: number;
  ACTM50: number;
  ACTM75: number;
  imageUrl: string;
}
'''

# maps firestore DB key to csv file key
attributeMapCollege = {
  'UID': 'UNITID',
  'name': 'INSTNM',
  'alias': 'IALIAS',
  'city': 'CITY',
  'state': 'STABBR',
  'website': 'WEBADDR',
  'appWebsite': 'APPLURL',
  'longitude': 'LONGITUD',
  'latitude': 'LATITUDE',
}

attributeMapCDS = {
  'standardizedTest': 'ADMCON7',
  'applicants': 'APPLCN',
  'applicantsM': 'APPLCNM',
  'applicantsW': 'APPLCNW',
  'admitted': 'ADMSSN',
  'admittedM': 'ADMSSNM',
  'admittedW': 'ADMSSNW',
  'enrolled': 'ENRLT',
  'enrolledM': 'ENRLM',
  'enrolledW': 'ENRLW',
  'SATPct': 'SATPCT',
  'ACTPct': 'ACTPCT',
  'SATRW25': 'SATVR25',
  'SATRW50': 'SATVR50',
  'SATRW75': 'SATVR75',
  'SATM25': 'SATMT25',
  'SATM50': 'SATMT50',
  'SATM75': 'SATMT75',
  'ACT25': 'ACTCM25',
  'ACT50': 'ACTCM50',
  'ACT75': 'ACTCM75',
  'ACTE25': 'ACTEN25',
  'ACTE50': 'ACTEN50',
  'ACTE75': 'ACTEN75',
  'ACTM25': 'ACTMT25',
  'ACTM50': 'ACTMT50',
  'ACTM75': 'ACTMT75',
}

# adds data for each attribute in the dataMap to the currentCollege dictionary
def processMap(dataMap, currentCollege, row):
  for attribute in dataMap:
    value = row[dataMap.get(attribute)]

    if isinstance(value, pd.Series) and value.empty:
      currentCollege[attribute] = None
    elif isinstance(value, pd.Series):
      currentCollege[attribute] = value.iloc[-1].item()
    elif isinstance(value, str):
      currentCollege[attribute] = value
    else:
      currentCollege[attribute] = value.item()

# 163286 for UMD
for i in range(20):
  currentCollege = {}
  collegeDataRow = collegeData.iloc[i]
  currentCollegeUID = collegeDataRow['UNITID'].item()
  cdsDataRow = cdsData.query(f'UNITID == {currentCollegeUID}')

  # If there is no data about number of applications the college wont be added to the database.
  if cdsDataRow['APPLCN'].empty:
    continue

  processMap(attributeMapCollege, currentCollege, collegeDataRow)
  processMap(attributeMapCDS, currentCollege, cdsDataRow)

  docRef = db.collection('testing').document(str(currentCollegeUID))
  docRef.set(currentCollege)






















# collegeIds = {}
# collegeData = pd.read_csv('hd2022.csv', encoding_errors='replace')
# cdsData = pd.read_csv('adm2022.csv')

# sampleData = {
#     "name": "John Doe",
#     "age": 30,
#     "city": "New York"
# }

# '''
# Col : Data
# -------------
# 0 : id (UNITID)
# 1 : Name (INSTNM)
# 2 : Abreviated Name (IALIAS)
# 3: Address (ADDR)
# 4: City (CITY)
# 5: State (STABBR)
# 16: Website (WEBADDR)
# 19: Application Website (APPLURL)
# (LONGITUD)
# (LATITUDE)
# '''

# for i in range(1397, 1398):
#   row = collegeData.iloc[i]
#   print(row['LATITUDE'])
#   print(row['LONGITUD'])
#   # if (row.iloc[4] == "College Park"):
#   #   print(row.iloc[4] + row.iloc[5])
#   #   print(i)


