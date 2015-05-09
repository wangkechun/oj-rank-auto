import time
import os
while 1:
  try:
    os.system('python ./run.py')
  except Exception as e:
    print e
  time.sleep(1)
