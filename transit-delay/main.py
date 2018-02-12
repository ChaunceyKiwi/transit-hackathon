import urllib.request
import xml.etree.ElementTree as ET
import time

def GetsBusesByStopNum(StopNo, RouteNo):
  "This function returns all active buses serving stop with StopNo"
  res_XML = urllib.request.urlopen(
    "http://api.translink.ca/rttiapi/v1/buses?apikey=zwsDYnyCwcRz1p1ubNrK&stopNo="+StopNo).read()
  root = ET.fromstring(res_XML)

  for child in root:
    if (child[2].text == RouteNo):
      print(child[0].tag + ": " + child[0].text)
      print(child[6].tag + ": " + child[6].text)
      print(child[7].tag + ": " + child[7].text)
      print(child[8].tag + ": " + child[8].text + "\n")

      print("Before")
      for key, value in prevLng.items():
        print(key, value)

      if (child[0].text in prevLng):
        print("Gate 1 passed.")
        if (float(prevLng[child[0].text]) <= float(StopPos['lng'])):
          print("Gate 2 passed")
          if (float(child[7].text) >= float(StopPos['lng'])):
            print("Gate 3 passed!")
      else:
        print("Not in!!!")  

      if (child[0].text in prevLng and float(prevLng[child[0].text]) <= float(StopPos['lng']) and float(child[7].text) >= float(StopPos['lng'])):
        f.write(child[8].text + " " + child[6].text + " " + child[7].text + "\n")
        print("Data recorded!\n")
      else:
        print("Data not recorded\n")

      prevLng[child[0].text] = child[7].text 

      print("After")
      for key, value in prevLng.items():
        print(key, value)

      prevSetFlag = 1

## Main function
prevLng = {}
StopNo = "58428"
RouteNo = "095"
StopPos = {'lat': 49.280952, 'lng': -123.0178225}

f = open('./test.txt', 'w')
print("StopNo: " + StopNo + "\n")
while True:
  GetsBusesByStopNum(StopNo, RouteNo)
  time.sleep(5)
