import styles from "./ProjectPages.module.css"

import NMSMain from "../assets/NMSMain.png"
import NMSLocations from "../assets/NMSLocations.png"
import NMSBases from "../assets/NMSBases.png"
import NMSSampleBase from "../assets/NMSSampleBase.png"
import NMSCoordEmpty from "../assets/NMSCoordEmpty.png"
import NMSCoordFull from "../assets/NMSCoordFull.png"
import NMSLoading from "../assets/NMSLoading.png"

export default function NMS({devMode}) {
    if(devMode) return <div className={styles.content}>
        <div className={styles.row}>
            <img src={NMSMain} alt="Main Page of App" className={styles.vertical}/>
            <p>
                I built this app to help navigate the universe of No Man's Sky, a space exploration game by Hello Games.
                I wrote it for Android after being inspired by a mobile programming class I had just taken.
                Most of the
                information displayed by the app is scraped (with permission) from the
                <a href="https://nmsgalactichub.miraheze.org/wiki/Main_Page">NMS Galactic Hub Wiki</a>in a way that
                can handle minor layout changes (new categories / table entries) of the site.
            </p>
            <img src={NMSLocations} alt="Locations of Interest Page" className={styles.vertical}/>
        </div>
        <div className={styles.row}>
            <img src={NMSLoading} alt="Loading Screen" className={styles.vertical}/>
            <p>
                Users are able to view and discover the address of player-uploaded bases, colonies, and other points of
                interest. When a user decides they want to see POI information, in this case player-made bases, the app fetches
                the appropriate html from the site's api point, parses it using JSOUP, and passes it to a new Android
                activity to be displayed. While all of this is happening, the user is shown a simple loading screen.
                Categories are parsed out of the original site data, and each location is placed under the appropriate category.
                <br/><br/>
                Once parsing is complete, thumbnail sized images (~250p) are quickly downloaded for the listings.
                When a user clicks on one to expand it, the higher-resolution image begins downloading, and the
                thumbnail is temporarily scaled up until the high-res version is ready to take its place.
                This process is usually only visible if the user is looking for it, and allows an image for the entry
                to be seen at all times.
            </p>
            <img src={NMSBases} alt="Bases Page" className={styles.vertical}/>
            <img src={NMSSampleBase} alt="Sample Base Page" className={styles.vertical}/>
        </div>
        <div className={styles.row}>
            <img src={NMSCoordEmpty} alt="Coordinate Translation Page" className={styles.vertical}/>
            <img src={NMSCoordFull} alt="Coordinate Translation Page showing translation in action" className={styles.vertical}/>
            <p>
                The app also features coordinate translation. In game locations can be described by either Galactic
                coordinates or portal addresses, with the possibility of equating any galactic coordinate to a portal
                address. It can be hard for players to find the portal address of the planet they are on, but relatively
                easy to find its galactic coordinates, so if a user wants to share the portal address, they can find it
                by typing in the galactic coordinates.
                <br/><br/>
                Portal addresses are a string of 12 hexadecimal numbers, but displayed in-game as a set of 16 glyphs.
                I created a component to be used both on the translation page and on colony description pages to show
                the glyphs instead of the hex string.
            </p>
        </div>
    </div>
    else return <div className={styles.content}>
        <div className={styles.row}>
            <p>
                I built this app to help navigate the universe of No Man's Sky, a space exploration game by Hello Games.
                I wrote it for Android after being inspired by a mobile programming class I had just taken.
                It retrieves data about public bases and colonies from a player-run website, allowing players to
                discover locations of interest and navigate the game's portal network from their phone.
            </p>
            <img src={NMSMain} alt="Main Page of App" className={styles.vertical}/>
        </div>
    </div>
}