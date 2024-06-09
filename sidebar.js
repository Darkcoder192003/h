function getTestCasesForUrl(url) {
    console.log(`Fetching test cases for URL: ${url}`);
    const testCases = {
      'https://www.jecjabalpur.ac.in/': [
        'Test Case 1: Verify login functionality',
        'Test Case 2: Check user profile update',
        'Test Case 3: Validate password reset',
      ],
      'another-site.com': [
        'Test Case 1: Check homepage load',
        'Test Case 2: Validate search functionality',
      ],
    };
  
    for (const site in testCases) {
      if (url.includes(site)) {
        console.log(`Matched site: ${site}`); // Debugging statement
        return testCases[site];
      }
    }
  
    console.log('No specific test cases found, returning default test cases.');
    return ['Default Test Case: General testing'];
  }
  

// Corrected createSidebar function with proper URL display
function createSidebar(url) {
    console.log('Creating sidebar');
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar-container';
    sidebar.innerHTML = `
      <h1>Test Cases</h1>
      <div id="test-cases"></div>
      <div id="page-url">Page URL inside: ${url}</div>
      <button id="submit-review">Submit Review</button>
    `;
    document.body.appendChild(sidebar);

    const styles = document.createElement('style');
    styles.innerHTML = `
      #sidebar-container {
        padding: 20px;
        width: 300px;
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        background-color: white;
        box-shadow: -2px 0 5px rgba(0,0,0,0.5);
        z-index: 10000;
      }
      #sidebar-container h1 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .test-case {
        margin: 5px 0;
      }
      #sidebar-container button {
        margin-top: 10px;
        padding: 10px;
        width: 100%;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
      }
      #sidebar-container button:hover {
        background-color: #45a049;
      }
    `;
    document.head.appendChild(styles);

    return sidebar;
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const url = tabs[0].url;
        console.log(`Active tab URL: ${url}`);
        const testCases = getTestCasesForUrl(url);

        const container = document.getElementById('test-cases');
        container.innerHTML = '';

        testCases.forEach((testCase, index) => {
            const div = document.createElement('div');
            div.className = 'test-case';
            div.innerHTML = `
                <input type="checkbox" id="case-${index}">
                <label for="case-${index}">${testCase}</label>
            `;
            container.appendChild(div);
            console.log(`Added test case: ${testCase}`);
        });

        document.getElementById('submit-review').addEventListener('click', function() {
            const uncheckedCases = [];
            testCases.forEach((testCase, index) => {
                const checkbox = document.getElementById(`case-${index}`);
                if (!checkbox.checked) {
                    uncheckedCases.push(testCase);
                }
            });
            if (uncheckedCases.length > 0) {
                alert('Please review the following test cases:\n' + uncheckedCases.join('\n'));
            } else {
                alert('All test cases have been checked. Good job!');
            }
        });
    });
});

  