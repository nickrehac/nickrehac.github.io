import styles from "./ProjectPages.module.css"

import fishAnimatedReres from "../assets/fishAnimatedReres.gif"
import fishAnimated from "../assets/fishAnimated.gif"
import fragAndVert from "../assets/FragAndVert.png"
import pixelAndVertInfo from "../assets/PixelAndVertInfo.png"
import clientVertexShader from "../assets/clientVertexShader.png"
import clientFragShader from "../assets/clientFragShader.png"

export default function AsciiGL({devMode}) {
    if(devMode) return <div className={styles.content}>
        <div className={styles.row}>
            <img
                src={fishAnimatedReres}
                className={styles.horizontalImage}
                alt="GIF showing response to resolution change"
            />
            <div className={styles.paragraph}>
                This is a software rasterizer library i wrote in C++. Users of the library are
                able to write their own vertex and fragment shaders in C++. It functions in both windowed terminals and
                TTY, and automatically responds to changes in screen resolution or font size . It depends on the GLM
                library for vertex and matrix manipulation, and ncurses for clean access to the terminal.
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.paragraph}>
                To use the library, users define custom implementations of three virtual base classes:
                VertexInformation, VertexShader, and FragmentShader. VertexInformation contains all important
                information about a given vertex in a triangle, such as its position, normal vector, and texture
                coordinates. Users can extend the base class to include any custom information they need, then override
                its interpolate() method to define how that information changes across the surface of a triangle. The
                VertexShader and FragmentShader classes each define a compute() method, which in the case of
                VertexShader takes a given vertex in the form of VertexInformation, and returns a modified copy
                according to the user's VertexShader definition. The FragmentShader's compute() method takes a fragment,
                also in the VertexInformation format, and returns a Pixel object, which determines what character and
                color to display at that fragment's position.
            </div>
            <img
                src={fragAndVert}
                alt="code showing fragment shader and vertex shader class definitions"
                className={styles.horizontalImage}
            />
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
                Here's another code snippet showing just how simple the structures the library actually works with can
                be. All in all, simplicity might be my favorite part of this library. The rasterization process is
                necessarily a little complex, but it's isolated from the end user. All a client program needs to worry
                about is what to display, where to display it, and how to display it.
            </div>
            <img
                src={pixelAndVertInfo}
                alt="code showing pixel and vertex information class definitions"
                className={styles.horizontalImage}
            />
        </div>

        <div className={styles.row}>
            <div className={styles.paragraph}>
                As one last example, here are the vertex and fragment shaders i wrote for the spinning fish. As classes,
                they are able to store properties and define helper methods. The vertex shader's rotX, rotY, and rotZ
                members can be modified before rendering, and this is how I make the object spin.
            </div>
            <img
                src={clientVertexShader}
                alt="code showing pixel and vertex information class definitions"
                className={styles.horizontalImage}
                style={{flex: "2 0"}}
            />
            <img
                src={clientFragShader}
                alt="code showing pixel and vertex information class definitions"
                className={styles.horizontalImage}
                style={{flex: "2 0"}}
            />
        </div>
    </div>
    else return <div className={styles.content}>
        simple mode
    </div>
}
