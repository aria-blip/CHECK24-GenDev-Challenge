# CHECK24-GenDev-Challenge

This is my submission for the [GenDev Scholarship from CHECK24](https://github.com/check24-scholarships/check24-comparison-challenge). The challenge was to create an **Internet Provider Comparison** application that integrates 5 different unreliable APIs, each with their own structure and output format.

##  Framework and Runtime

I chose to build a web app for its speed . The tech stack includes:

- **Runtime**: Deno (improved Node.js alternative)
- **Framework**: Fresh

### Why Fresh?
Fresh provides exceptional performance through its Island architecture - only components that need updates or are interactive are re-rendered,  This results in significant speed improvements and better user experience.

##  Solution Architecture

### API Integration

I created individual API call functions in the `/api/` folder for each of the 5 different APIs. The workflow is as follows:

1. **User Input**: User enters their address through the InputSearch Island (with built-in validation)
2. **Signal communication**: useSignal sends the address to the ResultPage island
3. **API Calls**: `Promise.allSettled()` executes all API calls simultaneously
4. **Error Resilience**: If one API fails or is slow, others continue processing
5. **Data Normalization**: All API responses are converted to a standardized `Product` class

#### Special Case: fetchVerbynDichOffers API
This API requires pagination with individual requests per page. I implemented sequential calls until reaching the last page. 
> **Note**: In retrospect, I should have used another `Promise.allSettled()` specifically for this API's pagination within the main Promise handler.

###  Filtering logic

The filtering logic is implemented within the ResultPage island:

- **listofdata**: Contains all products from APIs (permanent storage)
- **filteredlist**: Contains products after applying user-selected filters // i also add the products to filteredlist because the user could share the page without adding any filters in that case the fileterdlist would be empty 
- **Reactive Updates**: Uses useSignal for real-time re-rendering when filters change or new API data arrives

###  Sharing Feature

The sharing system allows users to share their filtered results:

1. **Trigger**: Share button appears when at least 5 products are available
2. **Data Preparation**: Current `filteredlist` is sent via POST request to `./api/share.ts`
3. **Storage**: Deno's built-in KV database (`Deno.openKv`) stores the data with a unique ID
4. **URL Generation**: The ID is appended as a URL parameter and copied to clipboard
5. **Retrieval**: Shared links use GET request to `./api/getShareData.ts` to restore the saved results

> **Technical Note**: I initially tried using `JSON.stringify()` to pass data via URL parameters, but the resulting 10K+ character URLs were too long (even after minimization to 4K).

###  Session State Management

User's last search is preserved using:
```javascript
localStorage.setItem("address", JSON.stringify(address));
```
implemented in `Inputfield.tsx` 

##  Additional Features

###  Product Comparison

Interactive comparison between two products:

1. **Selection**: Users click on products to select them for comparison
2. **State Management**: `twoselected` signal (type `Signal<Product[]>`) is shared between islands
3. **Islands Communication**: 
   - `ResultPage` island handles product selection
   - `ComparisonBox` island displays the comparison
   - Both share the same signal instance created in the main index file
4. **Reactive Display**: `useEffect` in ComparisonBox responds to selection changes
5. **Visual Differences**: `showDiff()` function highlights differences between products with color-coded styling (red for negative differences, etc.)

### Product Class Interface

All API data is normalized using a standardized `Product` interface, ensuring consistent data structure across different API sources despite varying original formats.The Product class also has
a  `additionalInfo:string[][] = []` because eachprovider has different or no additional inforamation .If they have it will look like `additionalInfo:string[][] = [["TV","super TV 1399"]...]`


##  Project Structure

```
/
├── api/
│   ├── [individual API call functions] // each api has the same hsema they all need a post request with a adress that is send from Resultpage and some return a list or jsut the raw data which is formated into an array of products in appliationmethods.tsx
│   ├── share.ts   // this gets called when a user clicks on teh share button in Resultpage it is a postrequest in the header there is the fileterd list in this  will be saved using deno kv it returns an id that is connected to the saved list this id will be made into a url and daved to users clipboard
│   └── getShareData.ts // is a GET and returns teh product list associated with a ID the Id is passed as a parameter in the url
├── islands/
│   ├── InputSearch.tsx // validades search result this is where the searchbox is in it gets value.value which is connected to Resultpage.tsx when a valid adress is given it  notifies by changing value.value
│   ├── ResultPage.tsx // this waits for a change in value.value which is passed from index.tsx it then calls all the apis and shows a list of them this also has the two twoselected signal which is connected to Comparisonbox.tsx 
│   ├── applicationmethods.tsx // here are most of the method used by ResultPage and ComparisonBox here are also where the async functions that are responsible of converting the apis data to type []<Product>
│   └── ComparisonBox.tsx // this waits for twoselected to be changed then it shows a pop up of the two selected items

├── components/
└── index.tsx (main page with signal instances)
```



## Deploy

the site is hosted via Deno Deploy [site](https://internetprovider-4qht92m6jxnv.deno.dev/)

## Deploy
- if you compile this project make sure to run it with --unstable-kv  `deno task --unstable-kv start`
- the site is not optimized for mobile 

**Challenge Repository**: [CHECK24 Comparison Challenge]([https://github.com/check24-scholarships/check24-comparison-challenge](https://internetprovider-syjc08ymqw35.deno.dev/))
http://localhost:8000?id=3450
