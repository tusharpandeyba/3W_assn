import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './leaderboard.css';

const Leaderboard = () => {
  // Mock data for 100 users
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [activeTab, setActiveTab] = useState('daily');

  useEffect(() => {
    // Generate mock data
    const generateUsers = () => {
      const mockUsers = [];
      for (let i = 1; i <= 100; i++) {
        mockUsers.push({
          id: i,
          name: i <= 3 ? `Top Player ${i}` : `Player ${i}`,
          points: Math.floor(10000 / i) * 10,
          avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
          isMystery: i === 2 || i === 6 // For mystery billionaire like in the image
        });
      }
      setUsers(mockUsers);
    };

    generateUsers();
  }, []);

  // Top 3 users (always visible)
  const topUsers = users.slice(0, 3);
  
  // Current page users (excluding top 3)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(3).slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil((users.length - 3) / itemsPerPage);
  
  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Container className="leaderboard-container">
      {/* Navigation */}
      <Row className="navigation-tabs mb-3">
        <Col>
          <div className="d-flex">
            <div className="nav-tab">Ranking</div>
            <div className="nav-tab">Hourly Ranking</div>
            <div className="nav-tab">Family Ranking</div>
            <div className="nav-tab active">Wealth Ranking</div>
          </div>
        </Col>
      </Row>

      {/* Time period tabs */}
      <Row className="time-period-tabs mb-4">
        <Col>
          <div className="d-flex bg-light rounded p-2">
            <div 
              className={`time-tab flex-grow-1 text-center py-2 ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily')}
            >
              Daily
            </div>
            <div 
              className={`time-tab flex-grow-1 text-center py-2 ${activeTab === 'monthly' ? 'active' : ''}`}
              onClick={() => setActiveTab('monthly')}
            >
              Monthly
            </div>
          </div>
        </Col>
      </Row>

      {/* Settlement time */}
      <Row className="settlement-time mb-3">
        <Col className="text-center">
          <div className="settlement-banner">
            Settlement time: 14 days 01:45:47
            <span className="rewards-badge">🎁 Rewards</span>
          </div>
        </Col>
      </Row>

      {/* Top 3 Users */}
      <div className="top-users-section mb-4">
        <div className="top-badge-decoration">
          <div className="winged-badge"></div>
        </div>
        <Row className="justify-content-between">
          {topUsers.map((user, index) => (
            <Col key={user.id} xs={12} md={4} className="mb-3">
              <Card className={`top-user-card position-${index + 1}`}>
                <div className="crown-badge position-absolute">
                  {index === 0 && <span className="blue-crown">👑</span>}
                  {index === 1 && <span className="gold-crown">👑</span>}
                  {index === 2 && <span className="bronze-crown">👑</span>}
                </div>
                <div className="avatar-container">
                  {user.isMystery ? (
                    <div className="mystery-mask">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="mask-overlay"></div>
                    </div>
                  ) : (
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                  )}
                </div>
                <div className="user-name">
                  {user.isMystery ? "Mystery billionaire" : user.name}
                </div>
                <div className="user-points">
                  <span className="coin">🪙</span> {user.points.toLocaleString()}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Paginated List (Ranks 4-100) */}
      <Card className="rank-list-card">
        {currentUsers.map((user, index) => {
          const actualRank = indexOfFirstItem + index + 4; // +4 because we skip the top 3
          return (
            <Row key={user.id} className="rank-item p-3 border-bottom">
              <Col xs={2} md={1} className="rank-number">
                {actualRank}
              </Col>
              <Col xs={6} md={8} className="d-flex align-items-center">
                {user.isMystery ? (
                  <div className="mystery-user d-flex align-items-center">
                    <div className="mystery-avatar-small">
                      <div className="mask-small"></div>
                    </div>
                    <span className="ms-2">Mystery billionaire</span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <img src={user.avatar} alt={user.name} className="rank-avatar" />
                    <span className="ms-2">{user.name}</span>
                  </div>
                )}
              </Col>
              <Col xs={4} md={3} className="user-points text-end">
                <span className="coin-small">🪙</span> {user.points.toLocaleString()}
              </Col>
            </Row>
          );
        })}
      </Card>

      {/* Pagination Controls */}
      <Row className="mt-4 mb-5">
        <Col className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {paginationItems}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Leaderboard;