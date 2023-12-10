import { faker } from '@faker-js/faker'

function getRandomGrade() {
  const sizes = ['cell', 'nano', 'micro', 'macro', 'mega', null]
  const randomIndex = Math.floor(Math.random() * sizes.length)
  return sizes[randomIndex]
}

export const INFLUENCER_USERS = [...Array(9)].map((_, index) => ({
  id: index,
  gender: faker.name.sexType(),
  name: faker.name.firstName() + faker.name.lastName(),
  username: '@' + faker.name.lastName(),
  email: faker.internet.email(),
  category: faker.name.jobArea(),
  grade: getRandomGrade(),
}))
