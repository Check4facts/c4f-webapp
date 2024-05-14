import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IArticle } from 'app/shared/model/article.model';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ISearchSuggestionBox {
  searchOpen: boolean;
  searchInput: string;
  suggestions: readonly IArticle[];
  handleSearchOpen: any;
}

const SearchSuggestionBox = (props: ISearchSuggestionBox) => {
  const { searchOpen, searchInput, suggestions, handleSearchOpen } = props;
  const [highlightedRow, setHighlightedRow] = useState(null);

  const handleRowHighlight = row => e => {
    setHighlightedRow(row);
  };

  return (
    <>
      {searchOpen && searchInput.length > 0 && (
        <div
          onBlur={handleSearchOpen('close')}
          style={{
            position: 'absolute',
            top: 'calc(100% - 5px)',
            left: '20%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '10px',
            maxHeight: '300px',
            width: '60%',
            border: '1px solid rgba(0,0,0,0.5)',
            overflowY: 'auto',
          }}
        >
          {suggestions.length > 0 ? (
            suggestions.slice(0,4).map((suggestion, idx) => (
              <div
                key={`search-row-${idx}`}
                onMouseEnter={handleRowHighlight(suggestion)}
                onMouseLeave={handleRowHighlight(null)}
                style={{
                  display: 'flex',
                  columnGap: 10,
                  height: '50px',
                  padding: '0.5rem',
                  backgroundColor: highlightedRow === suggestion ? '#EAEAF1' : 'white',
                  borderBottom: idx === 2 ? 'none' : '1px solid rgba(0,0,0,0.3)',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: "100%",
                  overflow: "hidden"
                }}
              >
                <FontAwesomeIcon icon="search" color="black" />
                <Link to={`/article/${suggestion.id}/display`} style={{ color: 'black', textDecoration: 'none' }}>
                  <div style={{ color: 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                    {suggestion.previewTitle}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div
              key={`search-row-not-found`}
              style={{
                display: 'flex',
                columnGap: 10,
                height: '50px',
                padding: '0.5rem',
                backgroundColor: 'white',
                alignItems: 'center',
              }}
            >
              <div style={{ color: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', flex: 1 }}>Δεν βρέθηκε κάποιο άρθρο</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchSuggestionBox;
