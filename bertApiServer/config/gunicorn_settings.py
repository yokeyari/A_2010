import os

# Sever Socket
host = '0.0.0.0'
port = os.getenv('PORT', 9876)

bind = str(host) + ':' + str(port)

# Debugging
reload = True

# Logging
accesslog = '-'
loglevel = 'debug'

# Proc Name
proc_name = 'Infrastructure-Practice-Flask'

# Worker Processes
workers = 3
worker_class = 'sync'
