<hr>
🌈 INTRODUCTION 🌈
<hr>
This project is a set of automated tests that are used to cover main functionality as well as the most popular user-flows here at test site https://www.saucedemo.com/.

All the tests are written with the [WebdriverIO](https://webdriver.io/) framework. 

Project contains tests for web.

It's created using page object model.


<hr>
💥 INSTALLATION PROCESS 💥
<hr>

If you need:
* Install [Node.js](https://nodejs.org/en/download/)

* Install [VSCode](https://code.visualstudio.com/)

And then you can:

  * Clone the repository to your machine
  * Install npm
    ```bash
      >  npm i
    ```
    
  * Install WebdriverIO

    ```bash
      >  npm init wdio . -- --yes
    ```
    
<hr>
🚀 TEST RUNNING 🚀
<hr>

In order to run the tests you need:  

  - Optional: Choose the test run name. For example:
    ```bash
        >  npm run wdio -- --spec ./test/specs/login.test.js
    ```  
  - Run the tests
    ```bash
        > npm run wdio
    ```

This project contains 13 tests, including 9 tests described in this [source](https://testluxequality.sharepoint.com/:x:/s/Mentors/EdKKAdQM7uRGgdG-zFoeXdEBYSo3Gg_YRlAX6WaC1imLuQ?rtime=uVeHFuM_3Ug).



<hr>
😱BUG-REPORT😱
<hr>


**Bug-report for test-case [9](https://testluxequality.sharepoint.com/:x:/s/Mentors/EdKKAdQM7uRGgdG-zFoeXdEBYSo3Gg_YRlAX6WaC1imLuQ?rtime=uVeHFuM_3Ug)**
----------------------------------

> Summary: The checkout process is possible with an empty cart.

> Description: The checkout process is possible in the case of an empty cart to the end.

> Priority: high

> Environment: Google Chrome 132.0.6834.159

> Preconditions:

>> User logged in account.

>> User is on the inventory page.

> Steps to reproduce:

>> 1. Click on the "Cart" button in the top right corner             -> Cart page is displayed, products are not displayed

>> 2. Click on the "Checkout" button                                 -> Pay attention to the page


   
> Expected result:   User are located on the "Cart" Page, error message "Cart is empty" are displayed

> Actual result:     User goes to the "Checkout" page and can continue checkout process. No error message appears.

------------------------

> Attachment: ![screenshot](https://prnt.sc/96avrJh6XmJ3)

------------------------
  
