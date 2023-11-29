# CEED Design Day Website

This website is made to show CEED Design Day attendees the schedule for the day. It gets the schedule data from an excel file that gets automatically parsed.

## Technologies used

- React (With Create React App)
- TypeScript
- FontAwesome
- TailwindCSS
- I18N-Next
- Headlessui
- Prettier

Hosted by CloudFlare Pages

## Environment Setup

To run and test the Design Day website locally, it's necessary to set up the environment variables. Follow these steps to set up your environment:

1. **Create a `.env` File**

    In the root directory of your project, create a file named `.env`.

2. **Add Environment Variables**
    
    Open the `.env` file and add the following lines: 
    ```
    REACT_APP_GOOGLE_API_KEY=your_google_api_key
    REACT_APP_GOOGLE_SHEETS_ID=your_google_sheets_id
    ```
    Replace `your_google_api_key` and `your_google_sheets_id` with your actual Google API key and Google Sheets ID, respectively. Both can be found on Cloudflare.

3. **Updating Environment Variables for Production**

    If you need to update the environment variables for the production environment, this can be done through Cloudflare Pages.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
