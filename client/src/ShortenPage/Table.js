import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Table = ({ loading, handleUrlClick, urls }) => {
  return (
    <div className="url-list ">
      {loading ? (
        <div className="loader">
          <FadeLoader color={"#7C807F"} loading={loading} />
        </div>
      ) : (
        <div className="table-responsive">
        <table className="table ">
          
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Long URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls &&
              urls.map((url, index) => {
                return (
                  <tr key={url._id}>
                    <td>{index + 1}</td>
                    <td>
                      <a target="_blank" href={url.longUrl}>
                        {url.longUrl}
                      </a>
                    </td>
                    <td>
                      <a
                        target="_blank"
                        href={url.shortUrl}
                        onClick={() => {
                          handleUrlClick();
                        }}
                      >
                        {url.shortUrl}
                      </a>
                    </td>
                    <td>{url.clicks}</td>
                  </tr>
                );
              })}
          </tbody>
         
        </table></div>
      )}
    </div>
  );
};

export default Table;
