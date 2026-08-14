import React, { useEffect, useState } from "react";

const App = () => {
  const [courseData, setCourseData] = useState([]);
  const [countryCode, setCountryCode] = useState(null);

  const [courseLoading, setCourseLoading] = useState(true);
  const [countryCodeLoading, setCountryCodeLoading] = useState(true);

  const [courseError, setCourseError] = useState(false);
  const [countryError, setCountryError] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // =========================
  // COURSE API
  // =========================

  const fetchCourseData = async () => {
    try {
      setCourseLoading(true);
      setCourseError(false);

      const response = await fetch(
        "https://syncsphere-hiv6.onrender.com/assignment/course-data"
      );

      if (!response.ok) {
        throw new Error("Course API Failed " + response.status);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid Course Data");
      }

      setCourseData(data);
    } catch (error) {
      console.log(error);
      setCourseError(true);
    } finally {
      setCourseLoading(false);
    }
  };

  // =========================
  // COUNTRY API
  // =========================

  const fetchCountryCode = async () => {
    try {
      setCountryCodeLoading(true);
      setCountryError(false);

      const response = await fetch(
        "https://syncsphere-hiv6.onrender.com/assignment/country-code"
      );

      if (!response.ok) {
        throw new Error("Country API Failed " + response.status);
      }

      const data = await response.json();

      if (!data?.country_code) {
        throw new Error("Invalid Country Data");
      }

      setCountryCode(data.country_code);
    } catch (error) {
      console.log(error);
      setCountryError(true);
    } finally {
      setCountryCodeLoading(false);
    }
  };

  // =========================
  // PRICE
  // =========================

  const getPrice = (course) => {
    if (countryCode === "IN") {
      return `₹${(course.pricePaise / 100).toLocaleString("en-IN")}`;
    }

    if (countryCode === "US") {
      return `$${(course.priceUsdCents / 100).toFixed(2)}`;
    }

    return null;
  };

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    fetchCourseData();
    fetchCountryCode();
  }, []);

  // =========================
  // SEARCH
  // =========================

  let courses = courseData.filter(
    (course) =>
      course.courseName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      course.description
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      course.mainCategory
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // =========================
  // SORT
  // =========================

  if (sort === "low") {
    courses = [...courses].sort((a, b) => {
      if (countryCode === "IN") {
        return a.pricePaise - b.pricePaise;
      }

      return a.priceUsdCents - b.priceUsdCents;
    });
  }

  if (sort === "high") {
    courses = [...courses].sort((a, b) => {
      if (countryCode === "IN") {
        return b.pricePaise - a.pricePaise;
      }

      return b.priceUsdCents - a.priceUsdCents;
    });
  }

  // =========================
  // LOADING
  // =========================

  if (courseLoading) {
    return (
      <>
        <style>{styles}</style>

        <main className="page">
          <section className="container">
            <p className="eyebrow">SKILLPATH</p>

            <h1>Explore Courses</h1>

            <p className="subtitle">
              Practical courses built to help you create, grow, and work
              smarter.
            </p>

            <div className="message">
              <div className="loader"></div>

              <h2>Loading courses...</h2>

              <p>Please wait while we fetch the latest courses.</p>
            </div>
          </section>
        </main>
      </>
    );
  }

  // =========================
  // COURSE ERROR
  // =========================

  if (courseError) {
    return (
      <>
        <style>{styles}</style>

        <main className="page">
          <section className="container">
            <p className="eyebrow">SKILLPATH</p>

            <h1>Explore Courses</h1>

            <p className="subtitle">
              Practical courses built to help you create, grow, and work
              smarter.
            </p>

            <div className="message">
              <div className="error-icon">!</div>

              <h2>We couldn't load the courses.</h2>

              <p>
                Something went wrong while fetching the course data.
              </p>

              <button onClick={fetchCourseData}>
                Try Again
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

  // =========================
  // EMPTY / NO SEARCH RESULT
  // =========================

  if (courses.length === 0) {
    return (
      <>
        <style>{styles}</style>

        <main className="page">
          <section className="container">

            <p className="eyebrow">SKILLPATH</p>

            <h1>Explore Courses</h1>

            <p className="subtitle">
              Practical courses built to help you create, grow, and work
              smarter.
            </p>

            <div className="controls">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort by price</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

            <div className="message">
              <h2>No courses found</h2>

              <p>
                Try searching with a different keyword.
              </p>
            </div>

          </section>
        </main>
      </>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <>
      <style>{styles}</style>

      <main className="page">
        <section className="container">

          {/* HEADER */}

          <div className="header">

            <div>
              <p className="eyebrow">SKILLPATH</p>

              <h1>Explore Courses</h1>

              <p className="subtitle">
                Practical courses built to help you create, grow, and
                work smarter.
              </p>
            </div>

          </div>

          {/* COUNTRY ERROR */}

          {countryError && (
            <div className="price-error">

              <div>
                <strong>Prices unavailable</strong>

                <span>
                  We couldn't determine your local currency.
                </span>
              </div>

              <button onClick={fetchCountryCode}>
                Reload Prices
              </button>

            </div>
          )}

          {/* SEARCH + SORT */}

          <div className="controls">

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">
                Sort by price
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>
            </select>

          </div>

          {/* COURSE GRID */}

          <div className="course-grid">

            {courses.map((course) => (

              <article
                className="course-card"
                key={course.mangoId}
              >

                {/* CARD TOP */}

                <div className="card-top">

                  <span className="category">
                    {course.mainCategory}
                  </span>

                  {course.refundable && (
                    <span className="refundable">
                      ✓ Refundable
                    </span>
                  )}

                </div>

                {/* COURSE NAME */}

                <h2>
                  {course.courseName}
                </h2>

                {/* DESCRIPTION */}

                <p className="description">
                  {course.description}
                </p>

                {/* SHORT COURSE */}

                <span className="course-type">
                  {course.shortCourse}
                </span>

                {/* CARD FOOTER */}

                <div className="card-bottom">

                  <div>

                    <span className="price-label">
                      Price
                    </span>

                    <strong className="price">

                      {countryCodeLoading
                        ? "Loading..."
                        : countryError
                          ? "Unavailable"
                          : getPrice(course)}

                    </strong>

                  </div>

                  <span className="arrow">
                    →
                  </span>

                </div>

              </article>

            ))}

          </div>

        </section>
      </main>
    </>
  );
};


// ======================================
// CSS
// ======================================

const styles = `

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: transparent;
  color: #111;
}

/* PAGE */

.page {

    width: "100%",
    height: "100%",
  padding: 70px 24px;
  background: transparent;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

/* HEADER */

.eyebrow {
  margin: 0 0 14px;
  color: #777;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

h1 {
  margin: 0;
  font-size: 58px;
  line-height: 1;
  letter-spacing: -2.5px;
}

.subtitle {
  max-width: 600px;
  margin: 18px 0 0;
  color: #666;
  font-size: 17px;
  line-height: 1.6;
}

/* SEARCH + SORT */

.controls {
  display: flex;
  gap: 12px;
  margin: 42px 0 32px;
}

.controls input,
.controls select {
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 0 14px;
  outline: none;
  font-size: 14px;
}

.controls input {
  flex: 1;
}

.controls select {
  width: 190px;
}

.controls input:focus,
.controls select:focus {
  border-color: #999;
}

/* PRICE ERROR */

.price-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  margin-top: 35px;
  padding: 14px 16px;

  border: 1px solid #f0d5d5;
  border-radius: 10px;

  background: rgba(255, 245, 245, 0.8);
}

.price-error div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-error strong {
  font-size: 14px;
  color: #8a3d3d;
}

.price-error span {
  font-size: 13px;
  color: #9b6262;
}

/* BUTTON */

button {
  border: none;
  border-radius: 8px;
  padding: 9px 14px;

  background: #111;
  color: white;

  font-size: 13px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

/* COURSE GRID */

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* CARD */

.course-card {
  display: flex;
  flex-direction: column;

  min-height: 330px;
  padding: 24px;

  border: 1px solid #e3e3e3;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.8);

  transition: transform 0.2s ease;
}

.course-card:hover {
  transform: translateY(-4px);
}

/* CARD TOP */

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.category {
  padding: 6px 9px;
  border-radius: 7px;

  background: #f1f1f1;

  color: #666;
  font-size: 11px;
  font-weight: 700;

  text-transform: uppercase;
}

.refundable {
  padding: 6px 9px;

  border-radius: 20px;

  background: #eaf7ee;
  color: #287342;

  font-size: 11px;
  font-weight: 600;
}

/* COURSE TITLE */

.course-card h2 {
  margin: 28px 0 10px;

  font-size: 25px;
  line-height: 1.15;
  letter-spacing: -0.7px;
}

/* DESCRIPTION */

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  overflow: hidden;

  margin: 0;

  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

/* COURSE TYPE */

.course-type {
  align-self: flex-start;

  margin-top: 20px;
  padding: 6px 10px;

  border: 1px solid #e5e5e5;
  border-radius: 7px;

  color: #555;
  font-size: 12px;
}

/* CARD BOTTOM */

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: auto;
  padding-top: 30px;
}

.price-label {
  display: block;
  margin-bottom: 5px;

  color: #888;
  font-size: 11px;
}

.price {
  font-size: 22px;
  letter-spacing: -0.5px;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 18px;
}

/* LOADING / ERROR / EMPTY */

.message {
  margin-top: 40px;
  padding: 55px 30px;

  border: 1px solid #e3e3e3;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.7);

  text-align: center;
}

.message h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.message p {
  margin: 0 0 20px;
  color: #777;
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  margin: 0 auto 18px;

  border-radius: 50%;

  background: #fff0f0;
  color: #c44;

  font-weight: bold;
}

.loader {
  width: 30px;
  height: 30px;

  margin: 0 auto 20px;

  border: 3px solid #ddd;
  border-top-color: #111;

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* TABLET */

@media (max-width: 900px) {

  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  h1 {
    font-size: 48px;
  }

}

/* MOBILE */

@media (max-width: 600px) {

  .page {
    padding: 50px 16px;
  }

  h1 {
    font-size: 40px;
  }

  .subtitle {
    font-size: 15px;
  }

  .controls {
    flex-direction: column;
  }

  .controls select {
    width: 100%;
  }

  .course-grid {
    grid-template-columns: 1fr;
  }

  .course-card {
    min-height: 300px;
  }

  .price-error {
    align-items: flex-start;
    flex-direction: column;
  }

}

`;

export default App;