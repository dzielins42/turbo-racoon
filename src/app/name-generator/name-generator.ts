export abstract class NameGenerator {
  generateMultiple(count : number) : string[] {
    let result : string[];
    result = [];
    for (let i = 0; i < count; i++) {
      result.push(this.generate());
    }

    return result;
  }

  abstract generate() : string;
  
  getRandomInt(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
