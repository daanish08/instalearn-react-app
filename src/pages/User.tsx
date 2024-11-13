import { Link } from 'react-router-dom';

const User = () => {
  // Mock data for demonstration purposes
  const userName = 'John Doe';
  const userDashBoardData = [
    { title: 'Tasks', count: 5, route: '/tasks', buttonTitle: 'View Tasks' },
    { title: 'Messages', count: 10, route: '/messages', buttonTitle: 'Check Messages' }
  ];
  const courseManagementCards = [
    {
      image: 'https://via.placeholder.com/300x280',
      title: 'Course 1',
      description: 'Description for Course 1',
      route: '/course-1',
      buttonText: 'Manage Course'
    },
    {
      image: 'https://via.placeholder.com/300x280',
      title: 'Course 2',
      description: 'Description for Course 2',
      route: '/course-2',
      buttonText: 'Manage Course'
    }
  ];

  return (
    <div className="bg-body-tertiary">
    <div className="container bg-body-tertiary">
      <h1 className="text-left fw-light pt-4 pb-4">
        Welcome, <span className="fw-bold text-success">{userName}</span>
      </h1>
      <div className="row text-center mb-4">
        {userDashBoardData.map((data, index) => (
          <div key={index} className="col-md-6">
            <div className="card border mb-3">
              <div className="card-header fw-light bg-success text-white">
                {data.title}
              </div>
              <div className="card-body bg-body-tertiary">
                <h5 className="card-title fs-3 text-muted pb-2">{data.count}</h5>
                <Link to={data.route} className="btn btn-success fw-bold">
                  {data.buttonTitle}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="row mb-2 bg-body-tertiary"
        style={{ paddingLeft: '80px', paddingRight: '80px' }}
      >
        <div className="col-md-12 px-1">
          {courseManagementCards.map((card, index) => (
            <div
              key={index}
              className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
            >
              <div className="col-auto d-none d-lg-block">
                <img
                  src={card.image}
                  className="bd-placeholder-img"
                  width="300"
                  height="280"
                  alt="Thumbnail"
                />
              </div>
              <div className="col p-5 d-flex flex-column position-static">
                <h3 className="mb-1 fw-semibold pt-3">{card.title}</h3>
                <div className="mb-1 text-muted fs-6 pb-3">
                  {card.description}
                </div>
                <Link
                  to={card.route}
                  className="btn btn-success fw-light"
                  style={{ width: '35%' }}
                >
                  {card.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};


export default User;
