**Generate Itinerary**
----
<hr>
  
  Generates an itinerary of what places someone should go based on a specified range of dates. What is recommended also depends on the weather in that area for that period of time as to weather indoor or outdoor activities are included.

* **URL:** `/yelp/<location>/<startdate>/<enddate>`

* **Method:** `GET`
  
*  **URL Params**

    * `location = [String]` == Location of where the trip will be taking place. Can be a specific address or general area.
    <hr> 

    *For date values, integers should in the format of YYMMDD*
    
   * `startdate = [integer]` == Specifies the first day of the trip you would like to generate

   * `startdate = [integer]` == Specifies the last day of the trip you would like to generate

* **Response:**

    **Code:** 200 <br />
    **Content:** An itinerary that is an array of days. Each day is also an array of objects giving information about each location to visit that day and when to visit it.

       [
            [
                { 
                    name: name given by yelp API,
  
                    startTime: When the user should go to this location,
  
                    endtime: When the user should leave this location,
  
                    url: link to the company page provided by yelp
                },
                and so on... (currently there are eight events in a day)
            ]
  
            [
                { 
                    name: name given by yelp API,
  
                    startTime: When the user should go to this location,
  
                    endtime: When the user should leave this location,
  
                    url: link to the company page provided by yelp
                },
                and so on... (currently there are eight events in a day)
            ]
            and so on...  (will do it for the number of days that the user specified)
        ]

* **Sample Call:** `/yelp/boston/200212/200217`

<br>
<br>

**Sign In**
----
<hr>
  
  Uses the Google API to sign user in to Travlr and authenticate their account.

* **URL:** `/signin`

* **Method:** `GET`
  
*  **URL Params**

    * *No parameters are required for this call*

* **Response:**

    **Code:** 200 <br />
    **Content:** An object containing the user's email and name

       { name: userName, email: userEmail }

* **Sample Call:** `/signin`

<br>
<br>

# **Database Interactions**

<hr>

* **Note:** Users must be signed in for any of these calls to work as these functions use their session after logging in to identify them.

<br>

**Save Itinerary**
----
<hr>
  
  Saves the last itinerary that this user generated to their account.

* **URL:** `/data/save`

* **Method:** `GET`
  
*  **URL Params**

    * *No parameters are required for this call*

* **Response:**

    **Content:** Flag telling you weather or not an authenticated user was logged in
    * *On Success:*
            
            { flag : "Success" }

    * *On Failure:*

            { flag : "User is not logged in"}

* **Sample Call:** `/data/save`

<br>
<br>

**Read Saved Plans**
----
<hr>
  
  Gets all of the itineraries that this user has saved to the database.

* **URL:** `/data/read`

* **Method:** `GET`
  
*  **URL Params**

    * *No parameters are required for this call*

* **Response:**

    **Content:** On success, this will now be an object from the database, containing their id, username, and a list of their itineraries. 
    * *On Success:*
            
            { 
                id: databaseID
                username: userEmail
                itineraries: 
                [
                    [
                        [
                            { 
                                name: name given by yelp API,
  
                                startTime: When the user should go to this location,
  
                                endtime: When the user should leave this location,
  
                                url: link to the company page provided by yelp
                            },
                            and so on, giving all events in this day
                        ],
                        and so on, giving all days in this itinerary
                    ],
                    [
                        [
                            { 
                                name: name given by yelp API,
  
                                startTime: When the user should go to this location,
  
                                endtime: When the user should leave this location,
  
                                url: link to the company page provided by yelp
                            },
                            and so on, giving all events in this day
                        ],
                        and so on, giving all days in this itinerary
                    ],
                    and so on, giving all itineraries this user has generated
                ]
            }

    * *On Failure:*

            { flag : "User is not logged in"}

* **Sample Call:** `/data/read`

<br>
<br>

**Delete Itinerary**
----
<hr>
  
  Removes a specified itinerary from this user's account.

* **URL:** `/data/remove/<removeID>`

* **Method:** `GET`
  
*  **URL Params**

    * `removeID = [integer]` == Specifies the position of the itinerary the user would like to remove in the *itineraries* array.

* **Response:**

    **Content:** Flag telling you weather or not an authenticated user was logged in
    * *On Success:*
            
            { flag : "Success" }

    * *On Failure:*

            { flag : "User is not logged in"}

* **Sample Call:** `/data/remove/1`