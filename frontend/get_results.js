document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const resultsContainer = document.getElementById("results");

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const text = document.getElementById("textid").value.trim();
        // text = text + " usa"
        const webOption = document.querySelector('input[name="webid"]:checked')?.value;
        const timeRange = document.getElementById("dateid").value;

        if (!text) {
            resultsContainer.innerHTML = `<p class="error">Please enter a search query.</p>`;
            return;
        }

        resultsContainer.innerHTML = `<p>Loading...</p>`;

        try {
            const response = await fetch("http://localhost:5500/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, webOption, timeRange }),
            });

            const data = await response.json();

            if (response.ok) {
                displayResults(data.results);
            } else {
                resultsContainer.innerHTML = `<p class="error">Error: ${data.error || "Failed to fetch results"}</p>`;
            }
        } catch (error) {
            console.error("Fetch error:", error);
            resultsContainer.innerHTML = `<p class="error">An error occurred. Please try again.</p>`;
        }
    });

    // function displayResults(htmlContent) {
    //     resultsContainer.innerHTML = `<iframe srcdoc="${htmlContent}" width="100%" height="600px"></iframe>`;
    // }

    // function displayResults(results) {
    //     if (!results || results.length === 0) {
    //         document.getElementById("results").innerHTML = `<p>No results found.</p>`;
    //         return;
    //     }
    
    //     let outputHTML = "<h3>Search Results:</h3><ul>";
    
    //     results.forEach(result => {
    //         outputHTML += `
    //             <li style="margin-bottom: 15px; list-style: none; border-bottom: 1px solid #ddd; padding: 10px;">
    //                 <a href="${result.link}" target="_blank" style="font-size: 18px; font-weight: bold; color: #1a0dab; text-decoration: none;">
    //                     ${result.title}
    //                 </a>
    //                 <p style="color: #006621; font-size: 14px; margin: 5px 0;">${result.link}</p>
    //                 <p style="color: #333;">${result.snippet || "No description available."}</p>
    //             </li>
    //         `;
    //     });
    
    //     outputHTML += "</ul>";
    
    //     document.getElementById("results").innerHTML = outputHTML;
    // }


    function displayResults(results) {
        if (!results || results.length === 0) {
            document.getElementById("results").innerHTML = `<p>No results found.</p>`;
            return;
        }
    
        let outputHTML = `
            <h3>Search Results:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f8f9fa; text-align: left;">
                        <th style="border: 1px solid #ddd; padding: 10px;">Job No</th>
                        <th style="border: 1px solid #ddd; padding: 10px;">Title</th>
                        <th style="border: 1px solid #ddd; padding: 10px;">Company</th>
                        <th style="border: 1px solid #ddd; padding: 10px;">Apply Here</th>
                    </tr>
                </thead>
                <tbody>
        `;
    
        results.forEach((result, index) => {
            // Only extract the company name for WorkDay results
            let company = '';
            if (result.link.includes("myworkdayjobs.com")) {
                // Extract company name from the link URL
                company = result.link.split('https://')[1].split('.')[0];
                company = company.charAt(0).toUpperCase() + company.slice(1);  // Capitalize the first letter
            }
    
            outputHTML += `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px;">${index + 1}</td>
                    <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #1a0dab;">
                        ${result.title}
                    </td>
                    <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; color: #333;">
                        ${company || 'N/A'}  <!-- Display 'N/A' if no company name is found -->
                    </td>
                    <td style="border: 1px solid #ddd; padding: 10px;">
                        <a href="${result.link}" target="_blank" style="color: #006621; text-decoration: none;">
                            Apply Here
                        </a>
                    </td>
                </tr>
            `;
        });
    
        outputHTML += `
                </tbody>
            </table>
        `;
    
        document.getElementById("results").innerHTML = outputHTML;
    }
    
});
