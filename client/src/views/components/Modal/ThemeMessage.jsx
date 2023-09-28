import React from 'react'

export const ThemeMessage = () => {
    const themes = [
        {
            name: "Default",
            bg: '#fff',
            textColor1: "#fff",
            textColor2: "#000",
            bgMessage: "rgba(58, 141, 245)",
        }
    ]
    return (
        <section className='wrapper-theme__modal'>
            <header>
                <div className="title">
                    <span>
                        Chủ đề
                    </span>
                </div>
            </header>
            <div className="theme-box">
                {themes?.map((item, index) => (
                    <div className='theme-item' key={index}>
                        <div className="theme-color">

                        </div>
                        <div className="theme-name">
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
