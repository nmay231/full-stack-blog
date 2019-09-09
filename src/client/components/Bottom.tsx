/** @format */

import * as React from 'react'

interface IBottom {
    // footer: Promise<JSX.Element>,
    footerid: string
}

const Bottom: React.FC<IBottom> = ({ children, footerid }) => {
    const [marginBottom, setMarginBottom] = React.useState(0)

    const onEntry: IntersectionObserverCallback = (entry) => {
        for (let change of entry) {
            setMarginBottom(change.intersectionRect.height)
        }
    }

    const intersectionObserver = new IntersectionObserver(onEntry, {
        threshold: [0, 0.33, 0.67, 1],
    })

    const mutationObserver = new MutationObserver((mutations, observer) => {
        for (let mut of mutations) {
            if (mut.type === 'childList') {
                let footer = document.getElementById(footerid)
                if (footer) {
                    observer.disconnect()
                    intersectionObserver.observe(footer)
                }
            }
        }
    })

    mutationObserver.observe(document.body, { childList: true })

    const styles = {
        marginBottom,
        zIndex: 0,
    }

    return (
        <div className="fixed-bottom d-flex" style={styles}>
            {children}
        </div>
    )
}

export default Bottom
