import { useState } from "react";
import Tracker from "../Tracker";
import { Tracker as TrackerType } from '../../Types/Tracker';
import { Card as CardType } from '../../Types/Card';
import { v4 as uuidv4 } from 'uuid';
import "./style.css"

const TrackerContainer: React.FC = () => {
    const [trackers, setTrackers] = useState<TrackerType[]>([]);

    const addTracker = () => {
        setTrackers([
          ...trackers,
          { id: uuidv4(), label: "", count: 0, image: "", artist: ""},
        ]);
    };
  
    const removeTracker = (id: string) => {
      setTrackers(trackers.filter(tracker => tracker.id !== id));
    }

    const getCardDataAPI = async (cardName: string): Promise<CardType | undefined> => {
      const fullURL = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`;
    
      try {
        const response = await fetch(fullURL, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error("API call failed");
        }
        const jsonData: CardType = await response.json();
        return jsonData;
      } catch (error) {
        console.error(error); // Use console.error instead of setError here if you're in a non-UI context
        return undefined;
      }
    };
  
    return (
      <div className="tracker-container">
        {trackers.map(tracker => (
          <Tracker
            key={tracker.id}
            id={tracker.id}
            label={tracker.label}
            count={tracker.count}
            image={tracker.image}
            artist={tracker.artist}
            onDelete={removeTracker}
            getData={getCardDataAPI}
          />
        ))}
        <div className="add-button-container">
          <button className="add-button" onClick={addTracker}>+</button>
        </div>
      </div>
    );
}

export default TrackerContainer;