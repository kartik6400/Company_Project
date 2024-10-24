const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const apiKey = "d2bca50aae3f59e7f77d80349c07b83d05161d3c445e3cc39137b2c3d16d3998";

app.post("/search", async (req,res)=>{
    console.log(req.body);
    const frontend_data = req.body;
    const query = frontend_data.query;
    const type = frontend_data.value;
    console.log(type);
    
    if(type =='youtube'){
    const url = "https://serpapi.com/search.json?engine=youtube&search_query="+query+"&api_key="+apiKey
    
    const api_result = await axios.get(url);
   
    const result = api_result.data;
    const videos = result.video_results;
    const rankedVideos = videos.sort((a,b)=>b.views-a.views);
    const extractedData = videos.map((video)=>{
        return{
            'title':video.title,
            'url':video.link,
        }
    })
    res.json(extractedData);
    }
    else if(type == 'blog'){
        
        const googleSearchAPI = "https://serpapi.com/search.json?engine=google&q="+query+"&google_domain=google.com&api_key="+apiKey;
        const result = await axios.get(googleSearchAPI);
        const blogs = result.data;
        const results = blogs.organic_results;
        
        const extractedInfo = results.map((item)=>{
            return{
                'title':item.title,
                'url':item.link
            }
        });
        // console.log(extractedInfo);
        res.json(extractedInfo);
    }
    else{
        const researchUrl = "https://serpapi.com/search.json?engine=google_scholar&q="+query+"&hl=en&api_key="+apiKey;
        const result = await axios.get(researchUrl);
        const research_papers =  result.data.organic_results;
       
        const sorted_papers = research_papers.sort((a,b)=> b.inline_links.cited_by.total-a.inline_links.cited_by.total);
        const extracted_data = sorted_papers.map((item)=>{
            return{
                'title':item.title,
                'url':item.link,
            }
        })
        res.json(extracted_data);
    }
})


app.listen(3000,()=>{
    console.log("Server running on 3000");
})