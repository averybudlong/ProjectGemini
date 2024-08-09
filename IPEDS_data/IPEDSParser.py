import pandas as pd
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

cred = credentials.Certificate("/home/avery/firebase/commoncollegedata-firebase-adminsdk-wcdch-9fadc5b4a2.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

collegeData = pd.read_csv('hd2022.csv', encoding_errors='replace')
cdsData = pd.read_csv('adm2022.csv')
financialData = pd.read_csv('drvf2022.csv')
headcountData = pd.read_csv('effy2022.csv')

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
  'enrolledCycle': 'ENRLT',
  'enrolledCycleM': 'ENRLM',
  'enrolledCycleW': 'ENRLW',
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

# EFFYALEV=2 for undergrad
attributeMapHeadcountUndergrad = {
  'enrolled': 'EFYTOTLT',
  'enrolledM': 'EFYTOTLM',
  'enrolledW': 'EFYTOTLW',
  'americanIndian': 'EFYAIANT',
  'americanIndianM': 'EFYAIANM',
  'americanIndianW': 'EFYAIANW',
  'asian': 'EFYASIAT',
  'asianM': 'EFYASIAM',
  'asianW': 'EFYASIAW',
  'black': 'EFYBKAAT',
  'blackM': 'EFYBKAAM',
  'blackW': 'EFYBKAAW',
  'hispanic': 'EFYHISPT',
  'hispanicM': 'EFYHISPM',
  'hispanicW': 'EFYHISPW',
  'pacificIslander': 'EFYNHPIT',
  'pacificIslanderM': 'EFYNHPIM',
  'pacificIslanderW': 'EFYNHPIW',
  'white': 'EFYWHITT',
  'whiteM': 'EFYWHITM',
  'whiteW': 'EFYWHITW',
  'multipleRaces': 'EFY2MORT',
  'multipleRacesM': 'EFY2MORM',
  'multipleRacesW': 'EFY2MORW',
  'unknownRace': 'EFYUNKNT',
  'nonUS': 'EFYNRALT',
  'nonUSM': 'EFYNRALM',
  'nonUSW': 'EFYNRALW',
  'unknownGender': 'EFYGUTOT',
}

# EFFYALEV=12 for grad
attributeMapHeadcountGrad = {
  'enrolledGrad': 'EFYTOTLT',
  'enrolledGradM': 'EFYTOTLM',
  'enrolledGradW': 'EFYTOTLW',
  'nonUSGrad': 'EFYNRALT',
  'nonUSGradM': 'EFYNRALM',
  'nonUSGradW': 'EFYNRALW',
}

attributeMapFinancial = {
  'revenuePublic': 'F1CORREV',
  'revenuePrivate': 'F2CORREV',
  'endowmentPerPublic': 'F1ENDMFT',
  'endowmentPerPrivate': 'F2ENDMFT',
  'instructionPerPublic': 'F1INSTFT',
  'instructionPerPrivate': 'F2INSTFT',
  'researchPerPublic': 'F1RSRCFT',
  'researchPerPrivate': 'F2RSRCFT',
}

# adds data for each attribute in the dataMap to the currentCollege dictionary
def processMap(dataMap, currentCollege, row):
  for attribute in dataMap:
    value = row[dataMap.get(attribute)]

    if isinstance(value, pd.Series) and value.empty:
      currentCollege[attribute] = None
    elif isinstance(value, pd.Series):
      lastItem = value.iloc[-1]
      if isinstance(lastItem, str):
        currentCollege[attribute] = lastItem if lastItem != "." else ""
      else:
        currentCollege[attribute] = lastItem.item()
    elif isinstance(value, str):
      currentCollege[attribute] = value
    else:
      currentCollege[attribute] = value.item()

# 163286 for UMD
def addAllCollegeData():
  for i in range(len(collegeData)):
    currentCollege = {}
    collegeDataRow = collegeData.iloc[i]
    currentCollegeUID = collegeDataRow['UNITID'].item()
    cdsDataRow = cdsData.query(f'UNITID == {currentCollegeUID}')
    headcountUndergradDataRow = headcountData.query(f'UNITID == {currentCollegeUID} and EFFYALEV == {2}')
    headcountGradDataRow = headcountData.query(f'UNITID == {currentCollegeUID} and EFFYALEV == {12}')
    financialDataRow = financialData.query(f'UNITID == {currentCollegeUID}')

    # If there is no data about number of applications the college wont be added to the database.
    if cdsDataRow['APPLCN'].empty:
      continue

    processMap(attributeMapCollege, currentCollege, collegeDataRow)
    processMap(attributeMapCDS, currentCollege, cdsDataRow)
    processMap(attributeMapHeadcountUndergrad, currentCollege, headcountUndergradDataRow)
    processMap(attributeMapHeadcountGrad, currentCollege, headcountGradDataRow)
    processMap(attributeMapFinancial, currentCollege, financialDataRow)

    docRef = db.collection('colleges').document(str(currentCollegeUID))
    docRef.set(currentCollege)

# accidently had 2 fields named enrolled meaning one of them was overwritten. This function is to add that data back in
def addEnrollementCycleData():
  docs = db.collection('colleges').get()

  for doc in docs:
    cdsDataRow = cdsData.query(f'UNITID == {doc.id}')
    docRef = db.collection('colleges').document(doc.id)
    docRef.update({"enrolledCycle": cdsDataRow["ENRLT"].item()})
    docRef.update({"enrolledCycleM": cdsDataRow["ENRLM"].item()})
    docRef.update({"enrolledCycleW": cdsDataRow["ENRLW"].item()})

addEnrollementCycleData()





  



















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


