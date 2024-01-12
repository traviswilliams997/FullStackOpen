describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    const user2 = {
      name: 'travis williams',
      username: 'travis',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })
  it('Front page can be opened', function () {
    cy.contains('log in to application')
  })
  it('Login form can be opened', function () {
    cy.contains('login').click()
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('barack')
      cy.get('#password').type('obama')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in and several blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'first post',
        author: 'p1',
        url: 'www.first.com',
        likes: 6,
      })
      cy.createBlog({
        title: 'second post',
        author: 'p2',
        url: 'www.second.com',
        likes: 1,
      })
      cy.createBlog({
        title: 'third post',
        author: 'p3',
        url: 'www.third.com',
        likes: 7,
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog post').click()
      cy.get('#title-input').type('test title')
      cy.get('#author-input').type('test author')
      cy.get('#url-input').type('test url')
      cy.contains('save').click()

      cy.contains('test title')
      cy.contains('Matti Luukkainen')
    })

    it('A blog can be liked', function () {
      cy.get('#view').click()
      cy.get('#like').as('likeDiv')
      cy.get('@likeDiv').contains('7')
      cy.get('@likeDiv').find('button').as('likeButton')
      cy.get('@likeButton').click()
      cy.get('@likeDiv').contains('8')
    })

    it('Remove button is only shown to the user that posted the blog', function () {
      cy.get('#view').click()
      cy.get('#expanded-blog').contains('remove')
    })
    it('User that posted the blog can delete it', function () {
      cy.get('#view').click()
      cy.get('#expanded-blog').as('blogDiv')
      cy.get('@blogDiv').contains('third post')
      cy.get('@blogDiv').find('button').contains('remove').click()
      cy.get('@blogDiv').should('not.contain', 'third post')
    })

    it('Only user that created blog can see remove', function () {
      cy.contains('Logout').click()
      cy.login({ username: 'travis', password: 'password' })
      cy.contains('view').click()
      cy.get('#expanded-blog').should('not.contain', 'remove')
    })

    it('Blogs are ordred by most liked', function () {
      cy.get('.blog').eq(0).should('contain', 'third post ')
      cy.get('.blog').eq(1).as('secondLiked').should('contain', 'first post')
      cy.get('.blog').eq(2).should('contain', 'second post')

      cy.get('@secondLiked').contains('view').click()
      cy.get('@secondLiked').contains(6).click()

      cy.get('@secondLiked').contains('Like').click()
      cy.get('@secondLiked').contains(7).click()

      cy.get('@secondLiked').contains('Like').click()

      cy.get('.blog').eq(0).should('contain', 'first post ')
      cy.get('.blog').eq(1).as('secondLiked').should('contain', 'third post')
      cy.get('.blog').eq(2).should('contain', 'second post')
    })
  })
})
