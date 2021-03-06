# api-watchface
Fitbit Ionic watch face for viewing and displaying points on a graph. 

![watch face image](https://image.ibb.co/ddrTe6/senssor4_screenshot_2.png)


# Requirments
- An API endpoint with data formated like so. 
```
{
  "_id":"ae710bda-edb5-4d00-aee5-4c876b625d9b",
  "device":"Other App",
  "date":1515679627108,
  "dateString":"2018-01-11T09:07:07.108-0500",
  "sysTime":"2018-01-11T09:07:07.108-0500",
  "sgv":135,
  "delta":1.001,
  "direction":"Flat",
  "noise":1,
  "filtered":135000,
  "unfiltered":135000,
  "rssi":100,
  "type":"sgv"
}
```

## Software
- [Nightscout 600 Series Android Uploader](https://github.com/pazaan/600SeriesAndroidUploader/wiki) - [Download APK](https://github.com/pazaan/600SeriesAndroidUploader/releases/)
- [xDrip](http://stephenblackwasalreadytaken.github.io/xDrip/) - [Download APK](https://github.com/NightscoutFoundation/xDrip/releases/)

## Instructions
1. follow the instuctions below for nightscout on your phone and in addition enable in settings/send To xDrip+ 
[Nightscount setup](https://github.com/pazaan/600SeriesAndroidUploader/wiki/Android-Uploader-Installation)
2. set up xdrip on your phone following the below instuctions and in xdrip go to settings/inner-app settings/ and enable broadcast locally .<br>
[Xdrip setup](https://github.com/NightscoutFoundation/xDrip/releases)
3. Once you have your end point set it should be https://127.0.0.1:17580/svg.json and you should be able to go to it on your phone. confirm that you can see json in your phones web browser.
4. Go into the Fitbit companion app and go into settings, and enter https://127.0.0.1:17580/svg.json into the REST API url
5. After that you are good to go, you should start seeing readings on the graph with in 5-10 minutes 
![companion app settings](https://image.ibb.co/maTLE6/26781740_10210968578590514_156639173_o.png)

