import styles from "./ProjectPages.module.css"
import fish from "../assets/fish.png"
import fishAnimated from "../assets/fishAnimated.gif"

export default function AsciiGL() {
    return <div className={styles.content}>
        <div className={styles.row}>
            <div className={styles.paragraph}>
                This is a software rasterizer library i wrote in C++ using the ncurses library. It losely borrows its
                architecture from OpenGL, in that users of the library are able to write their own vertex and fragment
                shaders (in C of course). It functions in both windowed terminals and TTY, and automatically responds to
                changes in screen resolution or font size.
            </div>
        </div>

        <div className={styles.row}>
            <img src={fishAnimated} alt="ascii fish" className={styles.horizontalImage}/>
            <div className={styles.paragraph}>
                I wrote a sample program which loads a *.gltf file, parses the triangle data, and displays the object
                rotating along the z-axis. This GIF shows a fish I modeled in blender and had the program render.
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.paragraph}>
                I began support for color, but then moved on to another project before I could test it
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.paragraph}>
                At
            </div>
        </div>
    </div>
}