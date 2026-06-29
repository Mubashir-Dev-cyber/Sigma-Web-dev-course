## How to host Node.js apps on Ubuntu

### Step 1 - Installing Node.js & build essentials
We'll install the current LTS (Long-Term Support) version of Node.js instead of a specific version number, so this step doesn't go stale over time.
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
Now install build essentials
```
sudo apt-get install build-essential
```

### Step 2 - Create a sample Node.js app
You can also use your own app if you want to host it. Otherwise if you are just trying out, you can use a sample app.


### Step 3 - Install pm2 & launch your app
Install pm2 package which is a process manager for Node.js applications
```
sudo npm install -g pm2
```

Now launch your app using this command
```
pm2 start index.js
```

Make pm2 survive a server reboot, so your app comes back automatically if the VPS restarts:
```
pm2 save
pm2 startup
```
This will print a command — copy and run that command too, it registers pm2 as a systemd service.

### Step 4 - Install nginx
Nginx is a web server which we will be using as a proxy
```
sudo apt install nginx
```

Now edit the file at /etc/nginx/sites-available/default using following command 
```
sudo nano /etc/nginx/sites-available/default
```

We want this file to look like this:
```
. . .
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
...
```

### Step 5 - Test and restart nginx
Test and restart nginx using following commands
```
sudo nginx -t
```
Now restart using:
```
sudo systemctl restart nginx
```

### Step 6 - (Optional but recommended) Open the firewall
If ufw is enabled on your VPS, allow Nginx traffic through it:
```
sudo ufw allow 'Nginx Full'
```

### Step 7 - (Optional but recommended) Add HTTPS
If your site has a domain pointed at the VPS, secure it with a free SSL certificate via Certbot:
```
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```
