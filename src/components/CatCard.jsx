const CatCard = ({ catData, onBanAttribute, banList }) => {
    const { url, breeds } = catData;

    const matchedBreed = breeds ? breeds[0] : null;

    const handleBanClick = (breed) => {
        onBanAttribute(breed.name);
    };

    return (
        <div className="cat-card-holder">
            <div className="cat-card">
                <img id="cat-img" src={url} alt="Cat" />
                
                <h3 id="card-breed">
                    Breed: 
                    <span> {matchedBreed ? matchedBreed.name : "No available breeds"}</span>
                    
                </h3>

                <a id="wiki_link" href={matchedBreed?.wikipedia_url} target="_blank" rel="noopener noreferrer">
                    {matchedBreed?.wikipedia_url}
                </a>

                <div className="attrib-list">
                    <p id="card-description">
                        {matchedBreed ? matchedBreed.description : "No description available"}
                    </p>
                    <p className="card-info">
                        <span>Origin: </span>
                        {matchedBreed ? matchedBreed.origin : "No origin available"}
                    </p>
                    <p className="card-info">
                        <span>Life Span: </span>
                        {matchedBreed ? matchedBreed.life_span : "No life span available"}
                    </p>
                    <p className="card-info">
                        <span>Weight: </span>
                        {matchedBreed ? matchedBreed.weight.metric : "No weight available"}
                    </p>
                    <p className="card-info">
                        <span>Temperament: </span>
                        {matchedBreed?.temperament}
                    </p>

                    {matchedBreed && (
                        <div id="ban-btn-holder">
                            <button id="ban-btn" onClick={() => handleBanClick(matchedBreed)}>BAN {matchedBreed.name}</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="ban-list">
                <h3>Ban List:</h3>
                <ul>
                    {banList.map((bannedBreed, index) => (
                        <li key={index}>{bannedBreed}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CatCard;
