/** @format */

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface I_404Page extends RouteComponentProps {}

const _404Page: React.FC<I_404Page> = ({ history }) => {
    return (
        <section className="row d-flex">
            <h1 style={{ fontSize: '9rem' }} className="col-12 text-center">
                {' '}
                404 Page not found!{' '}
            </h1>
            <h2 className="col-12 text-center mb-5">
                {' '}
                Sorry. We were not able to find that page ¯\_(ツ)_/¯{' '}
            </h2>
            <button className="btn btn-info mx-auto" onClick={() => history.goBack()}>
                {' '}
                Go Back{' '}
            </button>
        </section>
    )
}

export default withRouter(_404Page)
