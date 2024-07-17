
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const API_KEY = 'AIzaSyC1D3VEDWPpLTQWutCOlJtfrMkzwz4NXLU'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const mainwindow=document.querySelector(".upper");

document.getElementById('promptForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('promptInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        mainwindow.style.display="none";
        const formattedText = text.split('\n').map(line => `<p>${line}</p>`).join('');
        resultDiv.innerHTML = text;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred. Please try again.';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tbutton = document.querySelector('#tbtn');
    const side = document.querySelector('.sidenav');
    if (tbutton && side) {
        tbutton.addEventListener('click', function() {
            side.classList.toggle('active');
        });
    } else {
        console.error('Element not found');
    }
});
const inputarea=document.getElementById('promptInput');
inputarea.addEventListener('keyup',function(e){
    if(e.target.value.length>0){
        document.getElementById("response").style.display="inline";
    }
    else{
        document.getElementById("response").style.display="none";
    }
});