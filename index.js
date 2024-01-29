document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://fsa-async-await.herokuapp.com/api/2311-FSA-ET-WEB-PT-SF/endpoints';
    const partiesList = document.getElementById('partiesList');
    const partyForm = document.getElementById('partyForm');
  
    // Function to fetch parties and render them
    const fetchAndRenderParties = async () => {
      try {
        const response = await fetch(apiUrl);
        const parties = await response.json();
  
        // Clear previous list
        partiesList.innerHTML = '';
  
        // Render parties
        parties.forEach(party => renderParty(party));
      } catch (error) {
        console.error('Error fetching parties:', error.message);
      }
    };
  
    // Function to render a single party
    const renderParty = (party) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${party.name}</strong> - ${party.date}, ${party.time} - ${party.location} - ${party.description}
        <button data-id="${party.id}" class="deleteButton">Delete</button>
      `;
      partiesList.appendChild(li);
  
      // Add event listener to delete button
      const deleteButton = li.querySelector('.deleteButton');
      deleteButton.addEventListener('click', () => deleteParty(party.id));
    };
  
    // Function to delete a party
    const deleteParty = async (partyId) => {
      try {
        await fetch(`${apiUrl}/${partyId}`, { method: 'DELETE' });
        fetchAndRenderParties();
      } catch (error) {
        console.error('Error deleting party:', error.message);
      }
    };
  
    // Event listener for party form submission
    partyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
      };
  
      try {
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        // Clear form fields
        partyForm.reset();
  
        // Fetch and render updated parties
        fetchAndRenderParties();
      } catch (error) {
        console.error('Error adding party:', error.message);
      }
    });
  
    // Initial fetch and render
    fetchAndRenderParties();
  });