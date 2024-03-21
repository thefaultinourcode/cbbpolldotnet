import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { inDevEnvironment } from '../lib/isDevEnv';
export default function Navbar(props) {

    //figure out a better way
    const DURATION = "permanent";
    const SCOPE = "identity edit flair history read vote wikiread wikiedit";
    const REDIRECT_URI = inDevEnvironment ? "http://localhost:3000/profile" : 'http://cbbpoll.net/profile';
    const RANDOM_STRING = "randomstringhere"; //randomstring.generate();
    const RESPONSE_TYPE = "code";
    const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
    const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
    
    const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;
    
    const year = 2023;

    return props.user ? (
        <div className='navbar'>
            <ul className='navbar-list'>
                
                <li className='navbar-list-item'>
                    <div id='cbbLogo'>
                      <a href='../'>  <Image src={props.cbbLogo}
                            height="100"
                            width="104"
                            className='fixed-width'></Image> </a>
                    </div>

                </li>
                <div className='linkBlock'>
                <li className='navbar-list-item center'>
                    <div className="cbbup">
                       <b>r/CollegeBasketball Userpoll</b> 
                    </div>
                </li>
                </div>
                
                <div className='linkBlock'>
                    <li className='navbar-list-item center'>
                        <div className='homefield'>
                            <a href='https://www.homefieldapparel.com/products/r-cbb-logo-t-shirt' target='_blank' rel="noreferrer"><Image src={props.homefieldLogo} width="258" height="75"></Image></a>                            
                        </div>                    
                    </li>
                </div>

                <div className='linkBlock'>
                    <li className='navbar-list-item center'>
                    <Link href={`../seasons/${year}`}>
                    {/* <a href="../ballotBox"> */}
                        <div className='navbar-link'>
                            Results
                        </div>
                    {/* </a> */}
                    </Link>                    
                    </li>
                </div>

                <div className='linkBlock'>
                    <li className='navbar-list-item center'>
                    <a href="../ballotBox">
                        <div className='navbar-link'>
                            Vote
                        </div>
                    </a>                    
                    </li>
                </div>

                {/* Application Link */}
                <div className='linkBlock'>
                    <li className='navbar-list-item center'>
                    <a href="../applicationV2">
                        <div className='navbar-link'>
                            Application
                        </div>
                    </a>                    
                    </li>
                </div>

                <div className='linkBlock'>
                    <li className='navbar-list-item center'>
                    <a href="../about">
                        <div className='navbar-link'>About</div>
                    </a>                    
                    </li>
                </div>
                

                    <div id='usernameFloat' className='center'>
                            <li className='navbar-list-item'>
                                <a href="../profile"> <div className='navbar-link userName center'>{props.user}</div></a>
                                
                            </li>

                    </div>


            </ul>            
        </div>
    ) : ( <div className='navbar'>
            <ul className='navbar-list'>
                
                <li className='navbar-list-item'>
                    <div id='cbbLogo'>
                    <a href='../'>  <Image src={props.cbbLogo}
                            height="100"
                            width="104"></Image> </a>
                    </div>

                </li>
                <div className='linkBlock'>
                <li className='navbar-list-item center'>
                    <div className="cbbup">
                       <b>r/CollegeBasketball Userpoll</b> 
                    </div>
                </li>
                </div>
                
                <div className='linkBlock'>
                    <li className='navbar-list-item center'>
                        <div className='homefield'>
                            <a href='https://www.homefieldapparel.com/products/r-cbb-logo-t-shirt' target='_blank' rel="noreferrer"><Image src={props.homefieldLogo} width="258" height="75"></Image></a>                            
                        </div>                    
                    </li>
                </div>

                <div className='linkBlock'>
                    <li className='navbar-list-item center'>
                    <a href="../about">
                        <div className='navbar-link'>About</div>
                    </a>                    
                    </li>
                </div>
                

                    <div id='usernameFloat' className='center'>
                            <li className='navbar-list-item'>
                                <a href={URL}> <div className='navbar-link userName center'>{props.user}</div></a>                                
                            </li>
                    </div>


            </ul>            
        </div>
    )

}
