## Angular as frontend, Spring-boot as backend
### This demo web application is about creating companies and then on edit company page managing the employees belonging to that particular company.

**Installation instructions.**

***Backend(spring-boot and database)***

	1) Download XAMPP 7.4.33 from
    https://www.apachefriends.org/de/download.html
    
    2)Install XAMP from the Installer and Select Components: MySQL and
    phpMyAdmin
    
    3)In the end of the installation make sure you have checked the
    checkbox to start the XAMPP Control Panel. Inside it click on Start
    Actions for both Apache and MySQL
    
    4)Click on the Admin button of the MySQL component or go from the
    browser to: http://localhost/phpmyadmin/

	5) Click on the left side on "New"

	6) Enter "ebfdemo" as Database name and click on Create the database
	
	7) Open new tab and place this url: https://corretto.aws/downloads/latest/amazon-corretto-17-x64-windows-jdk.msi (This will download Amazon Corretto Java 17)
	
	8) Install it from its downloaded installer

	9) Open a new tab and place this url: https:
	https://dlcdn.apache.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.zip
	(This will download Maven)
	
	10)Unzip it into C:\Program Files

	11) Add in your Environment Variables "Path" the following: "C:\Program Files\apache-maven-3.8.6\bin" and the following: "C:\Program Files\Amazon Corretto\jdk17.0.5_8\bin"  (java jdk should be already in path)

	12) Go to this Github repository and download the code as a zip file: https://github.com/ParaskevasLysikatos/Angular-SpringBoot-demo

	13)Unzip it
	
	14) Open a command prompt and traverse to (where you had unzipped the demo project file) your path\Angular-SpringBoot-demo-master\paraskevas-demo-springboot
	and execute this command: mvn clean spring-boot:run
	
***Frontend(Angular)***

	1) Download LTS from https://nodejs.org/en/download/ and install it
	 
    2) Open a new terminal and issue: npm install -g @angular/cli
    
    3) Go to: paraskevas-demo-frontend file location in a terminal and issue the command: npm install
    
    (only on mac)
    4) sudo npm link @angular/cli 5) Open the
     
    5) Application's URL in Chrome: http://localhost:4200/
