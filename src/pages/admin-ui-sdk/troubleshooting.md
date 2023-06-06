---
title: Troubleshooting
description: 
---

# Troubleshooting

Encountering issues? Don't worry, we've got you covered. In this comprehensive troubleshooting guide, we'll help you navigate through common challenges and provide solutions to get you back on track. We'll walk you through the troubleshooting process, empowering you to resolve problems efficiently and effectively. Happy debugging!

## App menu is missing in the Commerce Admin Panel menu

It's common to have the App menu missing from the Commerce Admin Panel menu when:

1. The app is not correctly published in App Builder. Go to the App project in the developer console and check that the Production workspace is in status Published. If this is not the case, request an approval to publish and test again once the application in Approved. 

2. Latest changes are not correclty deployed and published. Make sure to deploy the latest changes using `aio app deploy` in the correct `org/project/workspace`.

3. The registration of the menu is not correct. Make sure that you defined the correct `menu` method with a function `getItems` that returns an array of the menus to register. 

To make sure your registration is correctly deployed, navigate in your browser to `<appURL>/index.html`. You can find your application URL in your project workspace in the Adobe developer console. 

Check the elements in your browser developer tools and look for the script src in the body. It usually have the following format `index.<random>.js`. 

Replace in the URL the `index.html` with this javascript to access its content. Search for `getItems` for example and make sure the registration defined in your app is the same one you see deployed. 

## App page is not displayed when accessing the menu

App page is not displayed when the extensionId specified doesn't match with the application or when the registration is missing mandatory methods. 

1. Check the app registration and make sure it contains the following:
	
	- `extension:getId` method that returns a string with the extensionId. 
	- `page:getTitle` method that returns a string with the page title.

2. Check the extensionId is the same used in the registration to identify correctly the application with a unique name. 

## Timout error

Timeout errors can occur when a process or operation takes longer than the specified time limit to complete. The retrieval of extensions from App Registry has a timeout set to 10000ms.

1. Check Network Connectivity:

	- Ensure that your network connection is stable and not experiencing any interruptions.
	- Verify that the server or service you are accessing is reachable from your network.

2. Refresh the page to check that the issue was not punctual. 

3. Escalate to Support or Engineering:

	- If you are unable to resolve the timeout issue, escalate the problem to the appropriate support or engineering team.
   *  Provide detailed information about the troubleshooting steps you have taken so far to expedite the resolution process.

## Support

Congratulations! You've reached the end of our Troubleshooting Documentation.

We hope that this guide has equipped you with the knowledge and tools to effectively troubleshoot issues and overcome obstacles. 

Should you encounter any challenges in the future, don't hesitate to revisit this documentation or reach out to our support team for further assistance. We're here to help you every step of the way.

Happy problem-solving!
