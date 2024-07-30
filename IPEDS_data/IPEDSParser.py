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
  admission: number;
  admissionM: number;
  admissionW: number;
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

for i in range(10):
  currentCollege = {}
  collegeDataRow = collegeData.iloc[i]
  currentCollegeUID = collegeDataRow['UNITID'].item()

  currentCollege['UID'] = currentCollegeUID
  currentCollege['name'] = collegeDataRow['INSTNM']
  currentCollege['alias'] = collegeDataRow['IALIAS']
  currentCollege['city'] = collegeDataRow['CITY']
  currentCollege['state'] = collegeDataRow['STABBR']

  docRef = db.collection('testing').document(str(currentCollegeUID))
  docRef.set(currentCollege)
  # if (row.iloc[4] == "College Park"):
  #   print(row.iloc[4] + row.iloc[5])
  #   print(i)




# doc_ref = db.collection('test').document("helllll")
# doc_ref.set(data)
# doc_ref.set(data2)



















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


