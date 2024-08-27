import { useState } from 'react';
import './style.css'
import { Card } from '../../Types/Card';

interface TrackerProps {
    id: string;
    label: string;
    count: number;
    image: string;
    artist: string;
    onDelete: (id: string) => void;
    getData: (cardName: string) => Promise<Card | undefined>;
}

const Tracker: React.FC<TrackerProps> = ({ id, label, count, image, artist, onDelete, getData }) => {
    const[num, setNum] = useState(count);
    const[itemLabel, setItemLabel] = useState(label);
    const [art, setArt] = useState(image);
    const [artistName, setArtistName] = useState(artist);

    // const img = "https:/cards.scryfall.io/art_crop/front/0/0/000a5154-90ba-459e-b122-d6893dfdb56f.jpg?1682714072";

    const incrementCount = () => {
        setNum(num + 1);
      };
    
    const decrementCount = () => {
        if (num > 0) {
            setNum(num - 1);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          (event.target as HTMLInputElement).blur(); // Unfocus the input
        }
    };

    const handleLabelChange = (e: { target: { value: any; }; }) => {
        setItemLabel(e.target.value);
    } 

    const handleNumberChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        const numericValue = Number(value);
        if (!isNaN(numericValue) && isFinite(numericValue)) {
            setNum(numericValue);
        }
    }
    
    const updateBackground = async () => {
        const card = await getData(itemLabel);
        
        if (card) {
          setArtistName(card.artist);
          setArt(card.image_uris.art_crop);
        } else {
          console.error('No card data received.');
        }
    }

    const backgroundStyle = art
        ? { background: `url(${art}) center/contain` }
        : { backgroundColor: 'darkgray' };

    return (
            <div className="tracker" style={backgroundStyle}>
                <div className="content">

                    <input
                        type="text"
                        value={itemLabel}
                        onChange={handleLabelChange}
                        onBlur={updateBackground} // Save on blur
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />

                    <input style={{fontSize: "32px"}}
                        type="text"
                        value={num}
                        onKeyDown={handleKeyDown}
                        onChange={handleNumberChange}
                    />
                    
                </div>
                <div className="actions">
                    <div className="left-half" onClick={() => decrementCount()}></div>
                    <div className="right-half" onClick={() => incrementCount()}></div>
                </div>
                <button className="delete-button" onClick={() => onDelete(id)}>x</button>
                <div className="artist-name">{artistName}</div>
            </div>

    );
};

export default Tracker;