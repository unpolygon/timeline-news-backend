import requests

res = requests.get("http://localhost:5000/eventCard/",verify=False)
print(res)